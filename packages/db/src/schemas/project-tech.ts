import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { project } from "./project";

export const projectTech = sqliteTable("project_tech", {
	id: text("id").primaryKey(),
	projectId: text("project_id")
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	sortOrder: integer("sort_order").notNull(),
});
