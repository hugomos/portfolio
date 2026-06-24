import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { project } from "./project";

export const projectHighlight = sqliteTable("project_highlight", {
	id: text("id").primaryKey(),
	projectId: text("project_id")
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	content: text("content").notNull(),
	sortOrder: integer("sort_order").notNull(),
});
