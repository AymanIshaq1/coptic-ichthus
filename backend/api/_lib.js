import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

export const hashToken = (value) => crypto.createHash('sha256').update(value).digest('hex');
export const newToken = () => crypto.randomBytes(32).toString('hex');
export const hashPassword = async (password) => {
  const bcrypt = await import('bcryptjs');
  return bcrypt.hash(password, 12);
};
export const comparePassword = async (password, hash) => {
  const bcrypt = await import('bcryptjs');
  return bcrypt.compare(password, hash);
};
export const signSession = (user) => jwt.sign(
  { sub: user.id, email: user.email, name: user.full_name },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);
export const verifySession = (req) => {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) return null;
  try { return jwt.verify(auth.slice(7), process.env.JWT_SECRET); } catch { return null; }
};
export const sendVerificationEmail = async ({ email, name, token }) => {
  const base = (process.env.APP_URL || '').replace(/\/$/, '');
  const verifyUrl = `${base}/verify-email?token=${encodeURIComponent(token)}`;
  return transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'تأكيد حسابك - تاريخ الكنيسة',
    text: `مرحباً ${name || ''}\n\nلتفعيل حسابك اضغط على الرابط التالي:\n${verifyUrl}\n\nإذا لم تنشئ هذا الحساب فتجاهل الرسالة.`,
    html: `<div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.8"><h2>تأكيد حسابك</h2><p>مرحباً ${name || ''}</p><p>اضغط على الزر التالي لتفعيل بريدك الإلكتروني:</p><p><a href="${verifyUrl}" style="display:inline-block;padding:12px 22px;background:#991b1b;color:#fff;text-decoration:none;border-radius:8px">تأكيد البريد الإلكتروني</a></p><p>إذا لم تنشئ هذا الحساب فتجاهل الرسالة.</p></div>`
  });
};

