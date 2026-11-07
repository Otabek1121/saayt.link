CREATE TABLE `guest_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`kind` text NOT NULL,
	`request_key` text NOT NULL,
	`payload` text NOT NULL,
	`fingerprint` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`public_body` text,
	`reply` text DEFAULT '' NOT NULL,
	`revision` integer DEFAULT 1 NOT NULL,
	`created` text NOT NULL,
	`updated` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `guest_request_unique` ON `guest_entries` (`project_id`,`kind`,`request_key`);--> statement-breakpoint
CREATE INDEX `guest_project_kind_status` ON `guest_entries` (`project_id`,`kind`,`status`,`created`);--> statement-breakpoint
CREATE INDEX `guest_rate` ON `guest_entries` (`project_id`,`fingerprint`,`created`);