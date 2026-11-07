# Production operations

Production is `cloudflare-migration`, Worker `saayt-link`, `https://saayt.link`.

## Sales inbox

`SALES_ADMIN_EMAIL` identifies the platform owner who can read sales inquiries, aggregate events and backup state. It does not grant access to another owner's project. Default production contact: theazik00@gmail.com. Change this variable when ownership changes. `/api/sales-leads` and `/api/backups` always enforce verified identity and private responses.

The new `sales_leads` and `funnel_daily` tables are additive and bootstrap idempotently on first use. No existing customer tables are rewritten. Optional SQL migration is in drizzle/0008_business_metrics.sql. The legacy project list remains compatible but is capped at 50; the UI uses bounded summary pages and separately authorized detail requests.

## Monitoring

Workers observability is enabled with 10% head sampling. `http_failure` logs contain method/path/status, not bodies, contacts, cookies or passwords. `backup_failed` identifies the failed stage. Check Cloudflare Workers logs after a deployment. Test Google OAuth on the canonical domain and verify Telegram delivery using the owner's test button before advertising.

## Backups and recovery

Every scheduled minute independently attempts notification delivery and one bounded backup step. Each day a new **logical** backup copies application table pages (10 rows each) into private R2 `backups/YYYY-MM-DD/tables/`. The complete manifest contains original table definitions and SHA-256 checksums. Immutable uploaded photos are copied once into `backups/assets/media/`. Originals never become public through these keys. There is no automatic deletion/retention purge in this release.

A manifest is written only after table export and photo copying finish. A failed step retains progress and retries next minute. This is a sequential logical copy, **not an atomic database snapshot**. Writes made while it runs can cause relational differences; use D1 Time Travel for exact point-in-time recovery. Backups remain in the same Cloudflare account; periodically export an off-account copy as well.

Download the desired date's R2 prefix and the shared `backups/assets/` prefix with an authorized R2 tool, preserving paths. With Node 24 run:

```sh
node scripts/verify-backup.mjs /path/to/downloaded-copy 2026-11-07
```

This restores the exported rows into an isolated in-memory SQLite database, checks each page checksum, database integrity, foreign keys and that all referenced uploaded files are present. It never connects to production. Do not restore a logical backup with failing foreign keys.

For a consistent independent D1 SQL export (requires Cloudflare credentials):

```sh
pnpm exec wrangler d1 export saayt-link-db --remote --output ./saayt-link-db.sql --config wrangler.jsonc
pnpm exec wrangler d1 time-travel info saayt-link-db --config wrangler.jsonc
```

Never restore over production without reviewing the target database and timestamp and taking a fresh export first. Check Cloudflare's displayed Time Travel retention window for this account. A recovery operation is deliberately not exposed in the customer UI.

## Release checks

```sh
pnpm exec tsc --noEmit
pnpm test
pnpm run build:cloudflare
```

Then review mobile/desktop home, template preview, empty/authenticated cabinet, draft autosave, separate publication, scoped client login, photo upload, real Telegram test and delivery status. Counts in the sales dashboard are aggregate actions, not unique visitors or audited conversion rates. Prices, client testimonials and real case studies must be supplied by the business; never invent them.

## Public interface languages

The homepage, catalogue, quote form, demo and public legal pages support `uz`, `kk`, `ru`, `en`, `tg`. A validated `?lang=` parameter overrides the `saayt-language` preference cookie. Native labels are used in the selector. The choice also persists locally when storage is available. Metadata, canonical URLs, hreflang alternatives and the marketing sitemap use the selected language.

The interface selector is separate from the new website language selector. Template previews retain all six existing content languages, including Kyrgyz. A manually chosen target language is not overwritten by an interface change. No existing customer texts, prices, photos or published snapshots are automatically translated or rewritten.
