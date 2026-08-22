# atelier-real-estate-webgl
A WebGL architectural visualization with scroll-driven cinematic camera journey, building scale animations, and immersive 3D effects using Three.js

## Run locally

Serve the repository over HTTP so the browser can load the ES module import map:

```sh
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173). The experience uses Three.js from a CDN and does not require a build step.

## Deploy to Vercel

Import the GitHub repository `aditidave0-ship-it/atelier-real-estate-webgl` in the [Vercel dashboard](https://vercel.com/new). Use the default settings:

- Framework preset: `Other`
- Build command: leave empty
- Output directory: `.`

Vercel will serve `index.html` directly. The included `vercel.json` enables clean URLs and basic response headers. Every push to `main` will produce a new deployment when the repository is connected to Vercel.
