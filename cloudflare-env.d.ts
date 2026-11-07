declare namespace Cloudflare {
  interface Env {
    PUBLIC_SITE_ORIGIN?: string;
    AUTH_PROVIDER?: string;
    SESSION_SECRET?: string;
    TELEGRAM_BOT_TOKEN?: string;
    TELEGRAM_BOT_USERNAME?: string;
    TELEGRAM_WEBHOOK_SECRET?: string;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
    DB?: D1Database;
    BUCKET?: R2Bucket;
  }
}
