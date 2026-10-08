import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const files = sqliteTable("files", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	keyname: text("keyname").notNull().unique(),
	contentType: text("content_type").notNull(),
	publicUrl: text("public_url").notNull(),
	createdAt: text("created_at").notNull(),
});
