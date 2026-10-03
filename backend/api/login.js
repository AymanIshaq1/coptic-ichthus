import { supabase, comparePassword, signSession } from './_lib.js';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  try {
    const { email, password } = req.body || {};
    const normalizedEmail = String(email || '').trim().toLowerCase();
    if (!normalizedEmail || !password) return res.status(400).json({ message: 'البريد الإلكتروني وكلمة المرور مطلوبان.' });
    const { data: user } = await supabase.from('users').select('id,full_name,email,password_hash,email_verified').eq('email', normalizedEmail).maybeSingle();
    if (!user || !(await comparePassword(password, user.password_hash))) return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' });
    if (!user.email_verified) return res.status(403).json({ message: 'يجب تأكيد بريدك الإلكتروني أولاً.' });
    return res.json({ token: signSession(user), user: { id: user.id, full_name: user.full_name, email: user.email } });
  } catch (error) {
    console.error('[AUTH][LOGIN] Failed:', { code: error?.code, message: error?.message, details: error?.details, hint: error?.hint });
    return res.status(500).json({ message: 'حدث خطأ أثناء تسجيل الدخول.' });
  }
}
