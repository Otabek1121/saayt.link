CREATE TABLE `media` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`key` text NOT NULL,
	`filename` text NOT NULL,
	`mime` text NOT NULL,
	`size` integer NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `media_owner_created` ON `media` (`owner`,`created`);--> statement-breakpoint
ALTER TABLE `projects` ADD `archived` integer DEFAULT 0 NOT NULL;