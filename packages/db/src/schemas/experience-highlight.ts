import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { experience } from "./experience";

export const experienceHighlight = sqliteTable("experience_highlight", {
	id: text("id").primaryKey(),
	experienceId: text("experience_id")
		.notNull()
		.references(() => experience.id, { onDelete: "cascade" }),
	content: text("content").notNull(),
	sortOrder: integer("sort_order").notNull(),
});
