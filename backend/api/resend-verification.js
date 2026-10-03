import { supabase, hashToken, newToken, sendVerificationEmail } from './_lib.js';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    if (!email) return res.status(400).json({ message: 'أدخل البريد الإلكتروني.' });
    const { data: user } = await supabase.from('users').select('id,full_name,email,email_verified').eq('email', email).maybeSingle();
    if (!user || user.email_verified) return res.json({ message: 'إذا كان الحساب يحتاج إلى تفعيل فسيتم إرسال رسالة جديدة.' });
    const token = newToken();
    await supabase.from('users').update({ verification_token_hash: hashToken(token), verification_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() }).eq('id', user.id);
    await sendVerificationEmail({ email, name: user.full_name, token });
    return res.json({ message: 'تم إرسال رسالة تفعيل جديدة.' });
  } catch (error) {
    console.error('[AUTH][RESEND_VERIFICATION] Failed:', { code: error?.code, message: error?.message, details: error?.details, hint: error?.hint });
    return res.status(500).json({ message: 'تعذر إرسال رسالة التفعيل.' });
  }
}
