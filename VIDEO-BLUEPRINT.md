# H. Rishabraj — reference-video implementation blueprint

This document converts the reference video into a build plan for the public website. The goal is to match the pacing and hierarchy, not copy branding or unverified claims.

## Experience sequence

1. Logo reveal / branded loader
2. Full-screen cinematic skyline / real project model
3. Legacy counters and trust metrics
4. Our Story editorial transition
5. Founder / leadership / vision media block
6. Our Journey chronology
7. Completed landmark chapters by year
8. Why Choose Us / trust pillars
9. Awards & Recognition
10. Signature development feature
11. Mumbai project footprint / interactive map
12. Curated project portfolio
13. Intelligent Habitats / amenities
14. Live Beyond the Address / lifestyle film and image scenes
15. Redevelopment transformation: existing → proposed future
16. Stories Behind Every Landmark
17. Property finder / lead qualification
18. Contact / footer

## Motion language

- Long, calm pinned hero rather than fast carousel behavior.
- Camera movement should feel architectural: dolly, orbit, crane and parallax, never game-like free movement.
- Section transitions alternate dark cinematic scenes with spacious editorial light sections.
- Large serif editorial interludes create breathing room between data-heavy sections.
- Counters, timeline nodes and project labels reveal only when their section enters view.
- Use restrained cursor/hover effects; building imagery and typography remain the focus.
- Mobile receives shorter camera paths, reduced shader cost and image/video fallbacks when required.

## Data rules

Only verified H. Rishabraj information should ship. Placeholder years, awards, RERA numbers, coordinates, availability, pricing and possession dates must be replaced with supplied/verified values before launch.

## Asset slots

- `/assets/models/avyaana.glb`
- `/assets/models/63-gma.glb`
- `/assets/models/phoenix.glb`
- `/assets/models/redevelopment-future.glb`
- `/assets/images/*-hero.webp`
- `/assets/images/lifestyle-*.webp`
- `/assets/images/redevelopment-before.webp`
- `/assets/images/redevelopment-after.webp`
- `/assets/video/brand-film.mp4`
- `/assets/video/lifestyle-film.mp4`
- `/assets/video/redevelopment-film.mp4`
- `/assets/brochures/<project>.pdf`

## Backend workstream

- Project catalogue API
- Enquiry intake and validation
- CRM handoff adapter
- Brochure request endpoint
- PII-free interaction events
- Campaign/source attribution
- Production anti-spam layer before public launch
- Analytics provider adapter after consent stack is selected

## Portal scope

The reference video eventually shows portal/dashboard functionality. Do not simulate this visually. Add customer/employee authentication only after real roles, user data, workflows and a secure identity provider are defined.
