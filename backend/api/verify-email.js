import { supabase, hashToken, signSession } from './_lib.js';
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
  try {
    const token = String(req.query?.token || '');
    if (!token) return res.status(400).json({ message: 'رابط التفعيل غير صالح.' });
    const { data: user } = await supabase.from('users').select('id,full_name,email,email_verified,verification_expires_at').eq('verification_token_hash', hashToken(token)).maybeSingle();
    if (!user) return res.status(400).json({ message: 'رابط التفعيل غير صالح أو تم استخدامه.' });
    if (new Date(user.verification_expires_at) < new Date()) return res.status(410).json({ message: 'انتهت صلاحية رابط التفعيل. اطلب رابطاً جديداً.' });
    const { data: updated, error } = await supabase.from('users').update({ email_verified: true, verification_token_hash: null, verification_expires_at: null }).eq('id', user.id).select('id,full_name,email').single();
    if (error) throw error;
    return res.status(200).json({ message: 'تم تفعيل الحساب بنجاح.', token: signSession(updated), user: updated });
  } catch (error) {
    console.error('[AUTH][VERIFY_EMAIL] Failed:', { code: error?.code, message: error?.message, details: error?.details, hint: error?.hint });
    return res.status(500).json({ message: 'تعذر تفعيل الحساب.' });
  }
}
