import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const company = sqliteTable("company", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	website: text("website"),
});
