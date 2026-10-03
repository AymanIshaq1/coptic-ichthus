import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

function checkEnv() {
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

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const result = {
    ok: false,
    environment: { ok: false, missing: [] },
    supabase: { ok: false },
    users_table: { ok: false },
    smtp: { ok: false },
    timestamp: new Date().toISOString()
  };

  result.environment = checkEnv();

  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { autoRefreshToken: false, persistSession: false }
      });
      const { error } = await supabase.from('users').select('id').limit(1);
      if (!error) {
        result.supabase.ok = true;
        result.users_table.ok = true;
      } else {
        result.supabase.errorCode = error.code || 'unknown';
        result.users_table.error = error.message || 'Database query failed';
        console.error('[HEALTH][SUPABASE]', error);
      }
    } catch (error) {
      result.supabase.error = 'Supabase client initialization failed';
      console.error('[HEALTH][SUPABASE]', error);
    }
  }

  if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });
      await transporter.verify();
      result.smtp.ok = true;
    } catch (error) {
      result.smtp.error = 'SMTP verification failed';
      console.error('[HEALTH][SMTP]', error);
    }
  }

  result.ok = result.environment.ok && result.supabase.ok && result.users_table.ok && result.smtp.ok;

  // This endpoint intentionally returns diagnostics only; it never returns secrets.
  return res.status(result.ok ? 200 : 503).json(result);
}
