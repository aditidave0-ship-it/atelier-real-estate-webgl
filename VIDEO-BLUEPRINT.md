# Reference video implementation blueprint

The uploaded ~200s reference video was reviewed section-by-section. The public-site experience we should reproduce structurally (without copying branding/content) is:

## 1. Cinematic skyline opening
- Wide skyline / landmark composition.
- Brand-led statement and headline.
- Numeric proof points visible immediately.
- Scroll should move the camera through real project architecture rather than behaving like a standard hero slider.

## 2. Legacy / company story
- Large editorial typography.
- Short, high-trust company narrative.
- Company metrics such as years, projects, area and families.
- Founder/visionary archive module with portrait/video once approved media is supplied.

## 3. Journey timeline
- Chronological milestones.
- Completed developments / landmark chapters by year.
- Progression should feel horizontal/cinematic on desktop and stacked on mobile.

## 4. Why choose us
- Four concise pillars: craftsmanship, trust, innovation, legacy.
- Motion should be subtle; premium spacing is more important than excessive card effects.

## 5. Awards & recognition
- Horizontal / perspective award gallery similar to the video treatment.
- Only verified award names/logos/certifications should be published.

## 6. Property finder
- Strong conversion block: location, property type, budget and contact fields.
- Connected to `/api/enquiry` and later the approved CRM/email stack.
- Add source/project attribution for lead quality analysis.

## 7. Signature developments
- One large highlighted development at a time.
- Actual project render or GLB as the main visual.
- Location / type / status / CTA layered over the scene.

## 8. Curated portfolio
- Dense visual grid for multiple projects.
- Filter-ready data model for residential, commercial, completed, ongoing and redevelopment categories.
- Project API already provides the first data contract.

## 9. Location / map experience
- Interactive Mumbai footprint.
- Markers update contextual project detail.
- Final coordinates should be verified before launch.

## 10. Live beyond the address
- Full-bleed lifestyle film/image sequence.
- Amenities should be communicated emotionally: wellness, landscape, community, arrival, interiors.
- Prefer real photography/video over generic stock imagery.

## 11. Stories behind every landmark
- Editorial hero story followed by story cards.
- Future categories: design, construction progress, resident/community stories, redevelopment and company insights.

## 12. Perspective / careers
- Reference video includes a company/career layer near the later public-site portion.
- Add only when real hiring content, culture imagery and application destination are approved.

## 13. Customer / employee portal
- Reference video shows portal/login screens near the end.
- This should be treated as a separate authenticated product, not a decorative public-site section.
- Do not build fake authentication. Add it only if H. Rishabraj has a real customer/employee workflow and backend identity system.

## What we are adding to H. Rishabraj

Already present or scaffolded: cinematic hero, company story, statistics, journey, project archive, why choose us, awards area, map, signature portfolio, lifestyle, intelligent habitats, redevelopment, stories and property finder.

Backend foundation now includes: project API, enquiry intake, brochure request contract, newsletter contract, privacy-safe interaction tracking and frontend service/controller modules.

Next asset-driven pass: replace procedural towers and gradient cards with real GLB models, renders, founder/company media, award assets, brochures and videos. Then tune scroll choreography section-by-section against the pacing of the reference video.
