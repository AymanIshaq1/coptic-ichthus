import { supabase, hashPassword, hashToken, newToken, sendVerificationEmail } from './_lib.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ message: 'كل الحقول مطلوبة.' });
    if (password.length < 8) return res.status(400).json({ message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل.' });
    const normalizedEmail = email.trim().toLowerCase();
    const { data: existing } = await supabase.from('users').select('id,email,email_verified').eq('email', normalizedEmail).maybeSingle();
    if (existing) return res.status(409).json({ message: existing.email_verified ? 'هذا البريد مسجل بالفعل.' : 'الحساب موجود، تحقق من بريدك الإلكتروني أو اطلب إعادة إرسال رسالة التفعيل.' });
    const passwordHash = await hashPassword(password);
    const token = newToken();
    const hasSmtp = !!process.env.SMTP_PASS;
    const { data: user, error } = await supabase.from('users').insert({
      full_name: name.trim(), email: normalizedEmail, password_hash: passwordHash,
      email_verified: !hasSmtp, verification_token_hash: hasSmtp ? hashToken(token) : null,
      verification_expires_at: hasSmtp ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() : null
    }).select('id,full_name,email').single();
    if (error) throw error;
    
    if (hasSmtp) {
      try { await sendVerificationEmail({ email: normalizedEmail, name: name.trim(), token }); }
      catch (mailError) {
        await supabase.from('users').delete().eq('id', user.id);
        throw mailError;
      }
      return res.status(201).json({ message: 'تم إنشاء الحساب. افحص بريدك الإلكتروني لتفعيل الحساب.' });
    }

    return res.status(201).json({ message: 'تم إنشاء الحساب بنجاح. يمكنك تسجيل الدخول الآن.' });
  } catch (error) {
    console.error('[AUTH][REGISTER] Failed:', { code: error?.code, message: error?.message, details: error?.details, hint: error?.hint });
    return res.status(500).json({ message: 'حدث خطأ أثناء إنشاء الحساب.' });
  }
}
