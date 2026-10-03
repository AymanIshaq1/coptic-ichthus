import { supabase, hashToken, newToken, transporter } from './_lib.js';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    if (!email) return res.status(400).json({ message: 'أدخل البريد الإلكتروني.' });
    const { data: user } = await supabase.from('users').select('id,full_name,email').eq('email', email).maybeSingle();
    if (user) {
      const token = newToken();
      await supabase.from('users').update({ reset_token_hash: hashToken(token), reset_expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString() }).eq('id', user.id);
      const url = `${(process.env.APP_URL || '').replace(/\/$/, '')}/reset-password?token=${encodeURIComponent(token)}`;
      await transporter.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to: email, subject: 'إعادة تعيين كلمة المرور', text: `رابط إعادة تعيين كلمة المرور: ${url}`, html: `<div dir="rtl"><h2>إعادة تعيين كلمة المرور</h2><p><a href="${url}">اضغط هنا لإعادة تعيين كلمة المرور</a></p></div>` });
    }
    return res.json({ message: 'إذا كان البريد مسجلاً، ستصلك رسالة لإعادة تعيين كلمة المرور.' });
  } catch (error) {
    console.error('[AUTH][FORGOT_PASSWORD] Failed:', { code: error?.code, message: error?.message, details: error?.details, hint: error?.hint });
    return res.status(500).json({ message: 'تعذر إرسال الرسالة.' });
  }
}
