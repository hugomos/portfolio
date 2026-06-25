CREATE TABLE `refresh_token` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`token_hash` text NOT NULL,
	`created_at` text NOT NULL,
	`expires_at` text NOT NULL,
	`used_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `refresh_token_token_hash_unique` ON `refresh_token` (`token_hash`);--> statement-breakpoint
CREATE INDEX `refresh_token_user_id_idx` ON `refresh_token` (`user_id`);--> statement-breakpoint
CREATE INDEX `refresh_token_token_hash_idx` ON `refresh_token` (`token_hash`);