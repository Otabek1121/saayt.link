CREATE TABLE client_credentials (
 project_id TEXT PRIMARY KEY NOT NULL REFERENCES projects(id),
 login TEXT NOT NULL,
 display_name TEXT NOT NULL DEFAULT '',
 password_hash TEXT NOT NULL,
 revision INTEGER NOT NULL DEFAULT 1,
 enabled INTEGER NOT NULL DEFAULT 1,
 telegram_username TEXT NOT NULL DEFAULT '',
 telegram_chat_id TEXT,
 connect_hash TEXT,
 connect_expires INTEGER,
 updated TEXT NOT NULL
);
CREATE TABLE client_login_attempts (
 key TEXT PRIMARY KEY NOT NULL,
 attempts INTEGER NOT NULL DEFAULT 1,
 expires INTEGER NOT NULL
);
CREATE TABLE notification_outbox (
 event_id TEXT PRIMARY KEY NOT NULL REFERENCES guest_entries(id),
 project_id TEXT NOT NULL REFERENCES projects(id),
 status TEXT NOT NULL DEFAULT 'pending',
 attempts INTEGER NOT NULL DEFAULT 0,
 next_attempt INTEGER NOT NULL DEFAULT 0,
 last_error TEXT NOT NULL DEFAULT ''
);
CREATE INDEX notification_due ON notification_outbox(status,next_attempt);
