import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { project } from "./project";

export const projectSocialLink = sqliteTable("project_social_link", {
	id: text("id").primaryKey(),
	projectId: text("project_id")
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	platform: text("platform").notNull(),
	username: text("username").notNull(),
	sortOrder: integer("sort_order").notNull(),
});
