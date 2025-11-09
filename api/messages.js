// api/messages.js
export default async function handler(req, res) {
  const secret = process.env.SHARED_SECRET || '';
  const qsecret = req.query.secret || '';
  const auth = req.headers.authorization || '';
  if (qsecret !== secret && auth !== `Bearer ${secret}`) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const since = parseInt(req.query.since || '0', 10) || 0;

  // ---- DEMO IN-MEMORY (unstable in serverless) ----
  const messages = global.__messages || [];
  const out = messages.filter(m => (m.ts || 0) > since);
  return res.status(200).json({ ok: true, messages: out });
}
