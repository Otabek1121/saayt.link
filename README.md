# Saayt.link

Source exported from the existing Saayt.link Site. The current live site has not been changed.

## Current runtime

This application uses Vinext, Cloudflare Workers, D1 (`DB`), R2 (`BUCKET`) and ChatGPT authenticated identity headers. It is not currently compatible with a standard Netlify deployment. Do not select a static publish directory or publish it as a plain Next.js application: database, uploads and authorization require migration first.

## Media

Run `node scripts/restore-export-assets.mjs` to restore the original public fonts and images from the bundled base64 files. Each download is verified against the SHA-256 export manifest. All original fonts and images are bundled under `deployment/asset-data`; the current site is only a fallback download source.

## Independent Cloudflare hosting

The `cloudflare-migration` branch adds a separate Cloudflare build and Google authentication. See [deployment instructions](docs/cloudflare-deployment.md). This prepares source code; it does not provision resources, migrate production data or change DNS.

## Migration requirements

- Replace trusted ChatGPT identity with independently verified authentication; never trust public request headers.
- Provision and migrate database records and uploaded media separately. No customer data or secrets are included here.
- Replace Cloudflare bindings or use independent Cloudflare Workers with D1/R2.
- Verify login, staff permissions, project editing, publishing, QR links and uploads before changing DNS.

The source export does not deploy a replacement or transfer production data.
