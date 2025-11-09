// api/publish.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const secret = process.env.SHARED_SECRET || '';
  const auth = req.headers.authorization || '';
  if (auth !== `Bearer ${secret}`) return res.status(401).json({ error: 'unauthorized' });

  const { author, content } = req.body || {};
  if (!author || !content) return res.status(400).json({ error: 'missing fields' });

  // ---- DEMO IN-MEMORY (unstable in serverless) ----
  if (!global.__messages) global.__messages = [];
  const item = { id: Date.now().toString(), ts: Date.now(), author, content };
  global.__messages.push(item);
  if (global.__messages.length > 5000) global.__messages.splice(0, global.__messages.length - 5000);

  return res.status(200).json({ ok: true, item });
                }
