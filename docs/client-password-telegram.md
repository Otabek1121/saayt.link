# Client login and Telegram notifications

## Release order

1. Apply `drizzle/0007_client_password_telegram.sql` to the existing D1 database before deploying this branch. Existing Google access and client content remain intact. This migration creates client_credentials, client_login_attempts and notification_outbox.
2. Deploy after checks pass. The owner completes content in the editor, saves the site, then configures client name, login, password and Telegram at the end of the editor. Login can be a name, phone or Telegram identifier. It is scoped to the public site's URL. Passwords need 12–128 characters; a generator is included.
3. Create a dedicated Saayt bot in @BotFather. Put its token in the Worker secret `TELEGRAM_BOT_TOKEN`, its username (without @) in `TELEGRAM_BOT_USERNAME`, and a random webhook secret in `TELEGRAM_WEBHOOK_SECRET`. Do not reuse a live bot webhook from another business.
4. All three Telegram values should be stored as Worker **Secrets**, including the public bot username, so later Wrangler deployments preserve them. Clicking the editor's Telegram-connect button validates getMe/username and registers the webhook to the configured PUBLIC_SITE_ORIGIN with its secret token. Existing webhooks belonging to another site are rejected rather than replaced. No Telegram token needs to pass through the client form.
5. Owner clicks “Получить ссылку подключения Telegram” and shares it with the intended client. Client opens it in the expected Telegram account and presses Start within 15 minutes. The token is stored hashed and consumed atomically; if a username is specified, it must match. Reissuing a link invalidates the old token. Bot /stop disconnects notifications.

## Authentication

Passwords are salted PBKDF2-SHA256 hashes, 100,000 iterations (the WebCrypto Workers limit), never stored in plaintext or returned by the API. Admin forms clear passwords after saving. Sessions are signed, Secure, HttpOnly, SameSite cookies with a 24-hour lifetime. Every request revalidates enabled/revision, so a reset or disable revokes existing password sessions immediately. A site-and-IP limit permits 10 attempts per 15-minute window. Rate keys are HMAC hashes. Clients receive only their assigned project's existing permissions. Old Google grants are optional and remain separately revocable.

## Requests and delivery

- Hostels keep their existing room booking form; accepted bookings now queue a notification.
- Restaurants get a food order/table request form; other templates get service appointment requests. Published item IDs and availability are validated server-side, and dish/service names and prices come from the published snapshot, never client-submitted prices.
- A request and its notification outbox row are saved atomically in D1. The request key prevents duplicate entries/outbox events when retrying the form. This is a request, not a paid order or guaranteed availability. Guests explicitly agree to share their contact details with the business.
- New orders/appointments are shown in the project's “Заявки клиентов” section with status controls. Hostel booking/review administration stays in its existing section. Public endpoints do not reveal contact details or credentials.
- Worker `waitUntil` attempts delivery after creation; a once-per-minute cron retries failed sends. Claims have a lease; rate limits use Telegram retry_after; delivery failures retry up to 10 times. Requests remain in the cabinet even if the bot is unavailable. The API does not claim Telegram delivery on request submission. If Telegram accepts a message but the acknowledgement or D1 update fails, a retry can duplicate the notification; entries remain idempotent.

## Domain cutover

When connecting saayt.link, update PUBLIC_SITE_ORIGIN in the tracked Wrangler config and deliberately move the bot webhook to the new origin (the guard rejects an existing different URL). Keep the Google OAuth callback configured for any retained Google login.

## Verification

TypeScript, production build and integration tests cover password hashing, scoped sessions, reset revocation, throttling, origin checks, owner-only configuration, atomic request/outbox creation, idempotency, username-bound one-time Telegram links, webhook secrets, recipient selection and retries. Telegram delivery is mocked in tests. Live bot activation and deployed browser checks require the account secrets and migration.
