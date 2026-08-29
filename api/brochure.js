const brochureMap = {
  avyaana: null,
  '63-gma': null,
  phoenix: null
};

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const project = String(req.query?.project || '').trim().toLowerCase();
  if (!project || !(project in brochureMap)) return res.status(404).json({ error: 'Brochure not found' });
  const url = brochureMap[project];
  if (!url) return res.status(202).json({ ok: false, status: 'pending', message: 'Verified brochure asset is not uploaded yet.' });
  return res.status(200).json({ ok: true, url });
}
