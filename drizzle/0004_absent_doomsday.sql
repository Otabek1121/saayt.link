CREATE TABLE `studio_members` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`owner_email` text NOT NULL,
	`email` text NOT NULL,
	`alias` text NOT NULL,
	`user_id` text,
	`status` text DEFAULT 'invited' NOT NULL,
	`created` text NOT NULL,
	`updated` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `studio_member_email` ON `studio_members` (`owner`,`email`);--> statement-breakpoint
CREATE INDEX `studio_member_identity` ON `studio_members` (`user_id`,`status`);