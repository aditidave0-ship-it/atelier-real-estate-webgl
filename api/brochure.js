function clean(value, max = 300) {
  return String(value ?? '').trim().replace(/[<>]/g, '').slice(0, max);
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid request body.' }); }
  }
  const request = {
    project: clean(body.project, 120),
    name: clean(body.name, 100),
    email: clean(body.email, 160).toLowerCase(),
    phone: clean(body.phone, 30),
    createdAt: new Date().toISOString()
  };
  if (!request.project) return res.status(400).json({ error: 'Project is required.' });
  if (!request.email && !request.phone) return res.status(400).json({ error: 'Email or phone is required.' });

  // When approved brochures are supplied, resolve the verified project PDF here.
  return res.status(202).json({
    ok: true,
    pending: true,
    message: 'Brochure request received. The verified brochure will be sent once available.'
  });
}
