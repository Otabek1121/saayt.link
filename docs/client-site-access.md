# Client editing

Clients use their own Google account. The owner opens an existing project, adds the client's Google email in «Доступ клиента», then copies its cabinet link. Email is not sent automatically. The public footer has «Кабинет» for all templates and languages. Login returns to the selected project's editor.

A client can update content, dish names/prices, contacts and photos and publish changes on that project. A client cannot view other projects, the owner's unrelated media, studio members, grant access or archive/unpublish/duplicate projects. Revocation is checked on every API request. Existing owner/team access is retained.

Before releasing this code, apply `drizzle/0006_project_clients.sql` to production D1. It adds project_clients and media.project_id. It does not migrate old data or change existing project ownership. Do not deploy first: old media tables do not have project_id.

Validation: real SQLite/R2-adapter API tests cover grants, isolation, scoped uploads, editing/publication, revocation, anonymous login redirects and unauthorized changes. TypeScript and the Cloudflare build must pass. Google login already configured on the Worker is reused; no password database is introduced.
