import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const hero = sqliteTable("hero", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	title: text("title").notNull(),
	bio: text("bio").notNull(),
	resumeUrl: text("resume_url"),
	githubUrl: text("github_url"),
	linkedinUrl: text("linkedin_url"),
	updatedAt: text("updated_at").notNull(),
});
