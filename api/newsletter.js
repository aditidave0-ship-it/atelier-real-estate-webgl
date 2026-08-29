function clean(value, max = 200) {
  return String(value ?? '').trim().replace(/[<>]/g, '').slice(0, max);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const email = clean(body.email, 160).toLowerCase();
  if (!validEmail(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });

  // Integration point: send to approved mailing/CRM provider using server-side environment variables.
  return res.status(201).json({ ok: true, message: 'Subscription received.' });
}
