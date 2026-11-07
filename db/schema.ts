import {sqliteTable,text,integer,index,uniqueIndex} from 'drizzle-orm/sqlite-core';
export const projects=sqliteTable('projects',{id:text('id').primaryKey(),owner:text('owner').notNull(),name:text('name').notNull(),spec:text('spec').notNull(),versions:text('versions').notNull(),published:text('published'),publicSlug:text('public_slug'),publicEnabled:integer('public_enabled').notNull().default(0),archived:integer('archived').notNull().default(0),revision:integer('revision').notNull().default(1),updated:text('updated').notNull()},t=>[uniqueIndex('projects_public_slug_unique').on(t.publicSlug)]);

export const media=sqliteTable('media',{id:text('id').primaryKey(),owner:text('owner').notNull(),projectId:text('project_id'),key:text('key').notNull(),filename:text('filename').notNull(),mime:text('mime').notNull(),size:integer('size').notNull(),created:text('created').notNull()},t=>[index('media_owner_created').on(t.owner,t.created)]);

export const guestEntries=sqliteTable('guest_entries',{
 id:text('id').primaryKey(),projectId:text('project_id').notNull().references(()=>projects.id),kind:text('kind').notNull(),requestKey:text('request_key').notNull(),payload:text('payload').notNull(),fingerprint:text('fingerprint').notNull(),status:text('status').notNull().default('pending'),publicBody:text('public_body'),reply:text('reply').notNull().default(''),revision:integer('revision').notNull().default(1),created:text('created').notNull(),updated:text('updated').notNull()
},t=>[uniqueIndex('guest_request_unique').on(t.projectId,t.kind,t.requestKey),index('guest_project_kind_status').on(t.projectId,t.kind,t.status,t.created),index('guest_rate').on(t.projectId,t.fingerprint,t.created)]);

export const studioMembers=sqliteTable('studio_members',{
 id:text('id').primaryKey(),owner:text('owner').notNull(),ownerEmail:text('owner_email').notNull(),email:text('email').notNull(),alias:text('alias').notNull(),userId:text('user_id'),status:text('status').notNull().default('invited'),created:text('created').notNull(),updated:text('updated').notNull()
},t=>[uniqueIndex('studio_member_email').on(t.owner,t.email),index('studio_member_identity').on(t.userId,t.status)]);

export const projectClients=sqliteTable('project_clients',{
 projectId:text('project_id').notNull().references(()=>projects.id),email:text('email').notNull(),created:text('created').notNull()
},t=>[uniqueIndex('project_client_email').on(t.projectId,t.email)]);

export const notificationOutbox=sqliteTable('notification_outbox',{
 eventId:text('event_id').primaryKey().references(()=>guestEntries.id),projectId:text('project_id').notNull().references(()=>projects.id),status:text('status').notNull().default('pending'),attempts:integer('attempts').notNull().default(0),nextAttempt:integer('next_attempt').notNull().default(0),lastError:text('last_error').notNull().default('')
});
