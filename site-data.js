export const siteData = {
  brand: {
    name: 'H. Rishabraj',
    descriptor: 'Builders & Developers',
    tagline: 'Energizing Happiness'
  },
  projects: [
    {
      id: 'avyaana',
      name: 'Avyaana',
      type: 'Residential',
      location: 'Goregaon East',
      status: 'Featured',
      model: './assets/models/avyaana.glb',
      heroImage: './assets/images/avyaana-hero.webp',
      gallery: [],
      map: { x: 31, y: 39 },
      camera: {
        position: [18, 10, 34],
        target: [0, 11, -8],
        scale: 1
      }
    },
    {
      id: '63-gma',
      name: '63 GMA',
      type: 'Commercial',
      location: 'Goregaon West',
      status: 'Featured',
      model: './assets/models/63-gma.glb',
      heroImage: './assets/images/63-gma-hero.webp',
      gallery: [],
      map: { x: 49, y: 58 },
      camera: {
        position: [-12, 17, 21],
        target: [-28, 11, -30],
        scale: 1
      }
    },
    {
      id: 'phoenix',
      name: 'Phoenix',
      type: 'Residential',
      location: 'Borivali West',
      status: 'Featured',
      model: './assets/models/phoenix.glb',
      heroImage: './assets/images/phoenix-hero.webp',
      gallery: [],
      map: { x: 68, y: 31 },
      camera: {
        position: [19, 17, 18],
        target: [28, 10, -34],
        scale: 1
      }
    }
  ],
  lifestyle: [
    { id: 'living', title: 'Living', image: './assets/images/lifestyle-living.webp' },
    { id: 'wellness', title: 'Wellness', image: './assets/images/lifestyle-wellness.webp' },
    { id: 'landscape', title: 'Landscape', image: './assets/images/lifestyle-landscape.webp' },
    { id: 'community', title: 'Community', image: './assets/images/lifestyle-community.webp' }
  ],
  redevelopment: {
    existingImage: './assets/images/redevelopment-before.webp',
    futureModel: './assets/models/redevelopment-future.glb',
    futureImage: './assets/images/redevelopment-after.webp'
  }
};
