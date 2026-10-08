CREATE TABLE `files` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`keyname` text NOT NULL,
	`content_type` text NOT NULL,
	`public_url` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `files_keyname_unique` ON `files` (`keyname`);--> statement-breakpoint
CREATE TABLE `project_social_link` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`platform` text NOT NULL,
	`username` text NOT NULL,
	`sort_order` integer NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `project` ADD `cover_image_url` text;--> statement-breakpoint
ALTER TABLE `project` ADD `cover_image_file_id` text;