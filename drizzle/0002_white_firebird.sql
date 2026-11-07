ALTER TABLE `projects` ADD `public_slug` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `public_enabled` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `projects_public_slug_unique` ON `projects` (`public_slug`);