# H. Rishabraj website backend

The site remains deployable as a static/WebGL experience, with Vercel serverless endpoints added for production integration.

## Endpoints

- `GET /api/projects` — project catalogue used by project/map experiences.
- `GET /api/projects?id=avyaana` — one project.
- `POST /api/enquiry` — validated enquiry intake with basic abuse protection.

## Enquiry payload

```json
{
  "name": "Visitor name",
  "phone": "+91...",
  "email": "visitor@example.com",
  "location": "Goregaon East",
  "propertyType": "Residential",
  "budget": "...",
  "message": "...",
  "project": "Avyaana"
}
```

## Next integration points

1. Connect `/api/enquiry` to the approved CRM or transactional email provider using Vercel environment variables. Do not expose provider secrets in browser JavaScript.
2. Move verified project inventory, configurations, RERA details, brochures and coordinates into the project API once supplied.
3. Add brochure/download endpoint when approved PDFs are available.
4. Add analytics/consent only after the preferred analytics stack is chosen.
5. Add production spam protection (Turnstile/reCAPTCHA or equivalent) before launch if public lead volume requires it.

## Asset contract

The project API paths match the prepared `/assets/models` and `/assets/images` structure. Real GLB/GLTF and render files can replace placeholders without changing API consumers.
