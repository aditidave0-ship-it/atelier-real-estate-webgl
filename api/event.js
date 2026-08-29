const allowedEvents = new Set([
  'project_view',
  'project_map_click',
  'brochure_request',
  'enquiry_open',
  'enquiry_submit',
  'story_open',
  'lifestyle_view',
  'redevelopment_view'
]);

function clean(value, max = 120) {
  return String(value ?? '').trim().replace(/[<>]/g, '').slice(0, max);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const event = clean(body.event, 80);
  if (!allowedEvents.has(event)) return res.status(400).json({ error: 'Unsupported event' });

  const payload = {
    event,
    project: clean(body.project, 100),
    section: clean(body.section, 100),
    source: clean(body.source, 100) || 'website',
    timestamp: new Date().toISOString()
  };

  // Integration point: forward anonymous event data to the chosen analytics provider.
  // Avoid collecting names, email addresses, phone numbers or arbitrary page text here.
  return res.status(202).json({ ok: true, accepted: payload.event });
}
