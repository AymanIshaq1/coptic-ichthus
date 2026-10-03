import { supabase, verifySession } from './_lib.js';
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
  const session = verifySession(req);
  if (!session) return res.status(401).json({ message: 'غير مصرح.' });
  const { data: user, error } = await supabase.from('users').select('id,full_name,email,email_verified,created_at').eq('id', session.sub).single();
  if (error || !user) return res.status(401).json({ message: 'المستخدم غير موجود.' });
  return res.json({ user });
}
