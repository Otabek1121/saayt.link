-- Filled only by an operator from verified ownership records during migration.
CREATE TABLE auth_legacy_identities (
  email TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL UNIQUE
);
