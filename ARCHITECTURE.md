# Forma 0.2 — business content studio

## Implemented
React/TypeScript with Next-compatible Vinext route handlers on Workers. D1/Drizzle stores owner-scoped projects, version snapshots and media metadata; R2 stores uploaded images. Zod validates all saved content. The original planned PostgreSQL/Prisma stack was adapted to the supported hosting runtime.

The homepage showcases scroll-driven templates; the separate builder provides a live desktop/mobile preview and a seven-tab editor. The owner console manages projects and the reusable media library. The editor remains authenticated through Sites sign-in; only explicitly published client snapshots are anonymous.

## Content model
`lib/spec.ts` defines a backwards-compatible SiteSpec v1 with:
- Company name, purpose, heading, about text, tagline and locale.
- Telephone, address, hours, email, Telegram, WhatsApp and primary action.
- Hero image, logo, gallery with order, alt text, focal x/y and cover/contain fit.
- Up to 60 items with category, description, up to eight photos and three niche-specific attributes. Optional price is rendered only for catalogs and menus; services have no displayed price.
- Team profiles, FAQ entries, niche-specific operational details and section switches.

`lib/business-profiles.ts` defines all 24 niche profiles: plumbing, restaurant, wedding, construction, retail, school, kindergarten, nails, legal, accounting, beauty, medical, dentistry, fitness, real estate, auto, cleaning, IT, logistics, travel, photography, furniture, repair and generic. Each has its own item terminology, three attribute labels, operational detail fields, gallery/team titles and content guidance. The homepage shows the complete 24-profile guide.

Catalogs and menus start empty to avoid presenting category labels or fabricated products as real offerings. Other niches receive editable demonstration service suggestions. No made-up reviews, prices, staff, licenses or performance statistics are inserted.

Old records without the new fields are normalized on reads and publication rendering. Their original services become editable items. New fields are stored in the existing JSON specification; migration 0001 adds media metadata and recoverable archive state.

## Image workflow
The browser decodes JPEG/PNG/WebP, resizes to at most 2000 pixels, and uploads WebP. It does not persist data URLs. The upload route requires a signed-in user, checks byte signatures, rejects unsupported formats, limits files to 5 MiB, rate-limits to 20/minute and applies a 600-file/250 MiB owner quota. R2 writes are rolled back if the metadata insert fails. Media reads filter by owner and use private caching and nosniff.

Saved image references may only point to approved local stock paths or `/api/media/<uuid>`. Every uploaded image referenced by a project is checked against its owner before save. Old snapshots retain access to their photos. Removing a photo from a page leaves it in the library for reuse; no destructive media deletion is exposed.

## Persistence and publication
- Each saved version is distinct from the published snapshot.
- Optimistic revisions prevent silently overwriting concurrent changes.
- The recent snapshot list is bounded by both count and encoded byte size.
- The editor displays unsaved state and warns on leaving the page. It does not claim autosave.
- Archive/restore are reversible. Archived publications are unavailable; restore returns their previous state.
- Duplicate creates an unpublished copy. Unpublish clears only the publication.
- Owner filters apply to every project and media operation. There is no cross-user administrator bypass.

## APIs
- GET/POST/PATCH `/api/projects`: list, save, publish, copy, archive, restore and unpublish.
- GET/POST `/api/media`: list and upload owner images.
- GET `/api/media/:id`: authenticated image delivery.
- GET `/api/session`: minimal sign-in state.
- `/site/:id`: render the owner's published snapshot, with archive checks.

## Design
Rules from https://github.com/elayadesign/ai-design-skills and existing-project design guidance inform typography, spacing, color, motion and accessibility. 25 local WebP photos have source/license records. Manrope/Geist/Poppins are local with OFL licenses. Uploaded images supersede demonstration hero scenes. Motion uses transforms/opacity, requestAnimationFrame and reduced-motion support. Gallery images open in a keyboard-accessible dialog, not an external website.

## Verification
Run `node --experimental-strip-types tests/backend.mjs` on Node 24. This exercises the actual route handlers using SQLite and an in-memory R2 adapter through test-only import hooks: schema migration, all 24 profiles, uploaded file roundtrip, full content persistence, owner isolation, media ownership, invalid formats, concurrency, independent publication snapshots, duplication, archive/restore, unpublish and legacy compatibility. Production authentication is never mocked in application code.

Run `npx tsc --noEmit` and the Sites build helper. Pending D1 migrations must be applied locally for preview; the publication workflow applies them to the hosted database. Real hosted end-to-end photo upload still requires an authenticated owner session and provisioned R2.

## Current limits and next work
Generation is deterministic demonstration content. AI providers, Google Places, custom domains, checkout/payments, CRM/Telegram lead forwarding, a booking calendar and shared staff roles are not connected. Calls, order enquiries and reservations link to the owner's actual phone/messenger; no nonfunctional forms are shown. Editing locale changes template labels, not the user's authored text. Niche attribute/editor labels are currently Russian.

## Public client publication (0.3)
The host audience can be public, but `/` and `/site/:id` require platform sign-in. All management and original-media endpoints retain authentication and owner filters. New public routes are `/s/:slug`, `/api/public-sites/:slug` and its scoped media route. Migration 0002 adds a unique nullable slug and opt-in public flag; old published records remain private by default. A public write must explicitly publish a snapshot. Draft saves do not change that snapshot. Duplicate copies have no public address. Archive and unpublish revoke public page and photo access; restoring an archived publication restores its former visibility. Reserved and occupied names are rejected; existing addresses are retained across content edits unless deliberately changed.
Public DTOs remove disabled sections, unrendered brief/legacy fields and unrelated detail keys. Uploaded image URLs are rewritten to the slug-scoped public route. That route permits only media referenced by the visible published snapshot and owned by the project's owner. Original media and unrelated library files remain private. Public JSON/media use no-store to support revocation. Title, description and sharing image derive from the published snapshot, not the editable draft. The public renderer omits the studio link. No new domain purchase is required: addresses use the shared service origin with `/s/<name>`. Wildcard subdomains and custom domains remain a separate hosting capability.
Verification extends the actual-handler tests to anonymous publication/media access, denied management writes, private/hidden image denial, hidden field redaction, slug uniqueness, existing private-record migration, draft isolation, revocation, restore, rename and private copies. A local-only demo fixture was used for browser QA and was not deployed as user data.

## Template marketplace (0.4)
Public `/templates` allows anonymous browsing of 24 niches × 4 layout families (96 configurations, not 96 independently authored designs). Search, niche/style filters, sort, device preview, incremental rendering (12 at a time) and browser-local favorite preferences are implemented. The full-page modal uses the actual SiteView renderer. Selecting a template redirects to authenticated studio with a validated template ID preserved through sign-in. Template style/ID persist in SiteSpec and survive publication. Users can change composition without resetting content. The existing motion scenes remain active for immersive matching niches. Forma JSON exports contain specification data only; imports are validated, bounded to 256KB and open unpublished drafts. File imports never execute code. Original library assets remain owner-scoped. Wix, Framer and FlutterFlow links open their official catalogs; their native projects are not imported or falsely represented as local templates.
