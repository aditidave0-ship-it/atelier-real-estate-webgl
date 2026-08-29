const ALLOWED_EVENTS = new Set([
  'hero_view','project_view','map_project_select','brochure_request','enquiry_start','enquiry_submit','story_view','redevelopment_view','lifestyle_view'
]);

function clean(value, max = 160) {
  return String(value ?? '').trim().replace(/[<>]/g, '').slice(0, max);
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid request body.' }); }
  }

  const event = clean(body.event, 80);
  if (!ALLOWED_EVENTS.has(event)) return res.status(400).json({ error: 'Unsupported event.' });

  const payload = {
    event,
    project: clean(body.project, 120),
    section: clean(body.section, 120),
    source: clean(body.source || 'website', 80),
    createdAt: new Date().toISOString()
  };

  // Integration point for the chosen analytics stack.
  // Keep this endpoint PII-free; lead identity belongs only in the enquiry workflow.
  void payload;
  return res.status(202).json({ ok: true });
}
