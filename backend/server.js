import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = __dirname;

function loadEnv(file = path.join(root, '.env')) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    if (process.env[key] === undefined) process.env[key] = value;
  }
}
loadEnv();

const port = Number(process.env.PORT || process.env.API_PORT || 3001);
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
const routes = {
  'POST /api/register': './api/register.js',
  'POST /api/login': './api/login.js',
  'GET /api/me': './api/me.js',
  'GET /api/verify-email': './api/verify-email.js',
  'POST /api/resend-verification': './api/resend-verification.js',
  'POST /api/forgot-password': './api/forgot-password.js',
  'POST /api/reset-password': './api/reset-password.js',
  'GET /api/health': './api/health.js'
};

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return {}; }
}

function createResponse(res) {
  return {
    status(code) { res.statusCode = code; return this; },
    json(payload) {
      if (!res.headersSent) res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(payload));
    },
    end(payload = '') { res.end(payload); }
  };
}

function maskEmail(value) {
  if (!value || !value.includes('@')) return 'not-configured';
  const [name, domain] = value.split('@');
  return `${name.slice(0, 2)}***@${domain}`;
}

function envStatus() {
  const required = [
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'JWT_SECRET',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'SMTP_FROM',
    'APP_URL'
  ];
  const missing = required.filter((key) => !process.env[key]);
  return { ok: missing.length === 0, missing };
}

async function runStartupDiagnostics() {
  console.log('\n========================================');
  console.log(' Church History Backend Diagnostics');
  console.log('========================================');
  console.log(`[CONFIG] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[CONFIG] APP_URL: ${process.env.APP_URL || 'NOT SET'}`);
  console.log(`[CONFIG] SMTP user: ${maskEmail(process.env.SMTP_USER)}`);

  const config = envStatus();
  if (config.ok) {
    console.log('[CONFIG] ✓ Required environment variables loaded.');
  } else {
    console.error(`[CONFIG] ✗ Missing environment variables: ${config.missing.join(', ')}`);
  }

  let supabase = null;
  let transporter = null;

  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { autoRefreshToken: false, persistSession: false }
      });

      const started = Date.now();
      const { data, error } = await supabase.from('users').select('id').limit(1);
      const ms = Date.now() - started;

      if (error) {
        console.error(`[SUPABASE] ✗ Connection/query failed (${ms} ms).`);
        console.error(`[SUPABASE]   Code: ${error.code || 'unknown'}`);
        console.error(`[SUPABASE]   Message: ${error.message || 'unknown error'}`);
        if (error.details) console.error(`[SUPABASE]   Details: ${error.details}`);
        if (error.hint) console.error(`[SUPABASE]   Hint: ${error.hint}`);
      } else {
        console.log(`[SUPABASE] ✓ Connected successfully (${ms} ms).`);
        console.log(`[SUPABASE] ✓ Table public.users is accessible. Rows returned: ${Array.isArray(data) ? data.length : 0}.`);
      }
    } catch (error) {
      console.error('[SUPABASE] ✗ Could not initialize Supabase client.');
      console.error(`[SUPABASE]   ${error?.message || error}`);
    }
  } else {
    console.error('[SUPABASE] ✗ Skipped connection test because SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing.');
  }

  if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const nodemailer = await import('nodemailer');
      transporter = nodemailer.default.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });
      const started = Date.now();
      await transporter.verify();
      console.log(`[SMTP] ✓ SMTP connection/authentication successful (${Date.now() - started} ms).`);
    } catch (error) {
      console.error('[SMTP] ✗ SMTP verification failed.');
      console.error(`[SMTP]   ${error?.message || error}`);
      console.error('[SMTP]   The backend will remain running, but email verification/reset emails will fail until SMTP is fixed.');
    }
  } else {
    console.error('[SMTP] ✗ Skipped SMTP test because required SMTP variables are missing.');
  }

  console.log('----------------------------------------');
  console.log('[SECURITY] Secrets are never printed in logs.');
  console.log('[HEALTH] GET /api/health for a safe diagnostic summary.');
  console.log('========================================\n');
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') { res.statusCode = 204; return res.end(); }

  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const route = `${req.method} ${url.pathname}`;
    const handlerPath = routes[route];
    if (!handlerPath) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      return res.end(JSON.stringify({ message: 'API route not found.' }));
    }
    const handlerUrl = pathToFileURL(path.resolve(root, handlerPath)).href;
    const { default: handler } = await import(handlerUrl);
    req.query = Object.fromEntries(url.searchParams.entries());
    req.body = await readBody(req);
    await handler(req, createResponse(res));
  } catch (error) {
    console.error(`[API] ${req.method} ${req.url} failed.`);
    console.error(error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ message: 'Internal server error.' }));
    }
  }
});

server.listen(port, '0.0.0.0', async () => {
  console.log(`Church History API running at http://localhost:${port}`);
  console.log(`CORS origin: ${corsOrigin}`);
  await runStartupDiagnostics();
});
