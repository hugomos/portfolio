import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { ProjectCategory, ProjectStatus } from "../types";

export const project = sqliteTable("project", {
	id: text("id").primaryKey(),
	title: text("title").notNull(),
	slug: text("slug").notNull().unique(),
	summary: text("summary").notNull(),
	impact: text("impact"),
	content: text("content"),
	category: text("category").$type<ProjectCategory>().notNull(),
	status: text("status").$type<ProjectStatus>().notNull(),
	repositoryUrl: text("repository_url"),
	liveUrl: text("live_url"),
	visible: integer("visible", { mode: "boolean" }).notNull().default(false),
	createdAt: text("created_at").notNull(),
	updatedAt: text("updated_at").notNull(),
});
