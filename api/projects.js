const projects = [
  { id:'avyaana', name:'Avyaana', type:'Residential', location:'Goregaon East', status:'Featured', model:'/assets/models/avyaana.glb', heroImage:'/assets/images/avyaana-hero.webp' },
  { id:'63-gma', name:'63 GMA', type:'Commercial', location:'Goregaon West', status:'Featured', model:'/assets/models/63-gma.glb', heroImage:'/assets/images/63-gma-hero.webp' },
  { id:'phoenix', name:'Phoenix', type:'Residential', location:'Borivali West', status:'Featured', model:'/assets/models/phoenix.glb', heroImage:'/assets/images/phoenix-hero.webp' }
];

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400');
  const id = String(req.query?.id || '').trim();
  if (!id) return res.status(200).json({ projects });
  const project = projects.find(item => item.id === id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  return res.status(200).json({ project });
}
