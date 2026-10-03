import { supabase, hashPassword, hashToken } from './_lib.js';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  try {
    const { token, password } = req.body || {};
    if (!token || !password || password.length < 8) return res.status(400).json({ message: 'الرابط أو كلمة المرور غير صالحة.' });
    const { data: user } = await supabase.from('users').select('id,reset_expires_at').eq('reset_token_hash', hashToken(token)).maybeSingle();
    if (!user || !user.reset_expires_at || new Date(user.reset_expires_at) < new Date()) return res.status(410).json({ message: 'انتهت صلاحية رابط إعادة التعيين.' });
    const password_hash = await hashPassword(password);
    const { error } = await supabase.from('users').update({ password_hash, reset_token_hash: null, reset_expires_at: null }).eq('id', user.id);
    if (error) throw error;
    return res.json({ message: 'تم تغيير كلمة المرور بنجاح.' });
  } catch (error) {
    console.error('[AUTH][RESET_PASSWORD] Failed:', { code: error?.code, message: error?.message, details: error?.details, hint: error?.hint });
    return res.status(500).json({ message: 'تعذر تغيير كلمة المرور.' });
  }
}
