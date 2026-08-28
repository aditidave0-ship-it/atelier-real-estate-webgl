# H. Rishabraj production asset handoff

The upgraded site is prepared to move from procedural placeholders to real project assets.

## Models
Put final web-ready models in `assets/models/` using these names:

- `avyaana.glb`
- `63-gma.glb`
- `phoenix.glb`
- `redevelopment-future.glb`

Preferred format: GLB 2.0. Keep each hero model ideally under 15–20 MB after Draco/Meshopt compression. Use physically based materials, baked lightmaps only where necessary, and real-world relative scale. Remove hidden CAD geometry, duplicate interiors, construction guides, cameras, and unused textures before export.

## Project renders
Put optimized WebP/AVIF renders in `assets/images/`:

- `avyaana-hero.webp`
- `63-gma-hero.webp`
- `phoenix-hero.webp`

Additional gallery images can be added later and referenced from `site-data.js`.

## Lifestyle

- `lifestyle-living.webp`
- `lifestyle-wellness.webp`
- `lifestyle-landscape.webp`
- `lifestyle-community.webp`

## Redevelopment transformation

- `redevelopment-before.webp`
- `redevelopment-after.webp`
- `redevelopment-future.glb`

The final experience will use the before image as the existing condition and the GLB / after render for the scroll-controlled future reveal.

## Videos
Create `assets/video/` and use MP4 (H.264) plus WebM where possible. Hero/lifestyle clips should normally be muted, loopable, 6–15 seconds, and compressed for web delivery. Poster images should be supplied for mobile and slow connections.

## Integration
`site-data.js` is now the single source for project names, location labels, asset paths, map positions, and camera presets. `model-loader.js` loads GLB models, frames them to a consistent scale, enables shadows, and gracefully leaves the procedural fallback in place when an asset is missing.

Do not rename final assets after integration without updating `site-data.js`.
