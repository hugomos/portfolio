import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
	id: text("id").primaryKey(),
	email: text("email").notNull().unique(),
	passwordHash: text("password_hash").notNull(),
	createdAt: text("created_at").notNull(),
	updatedAt: text("updated_at").notNull(),
});
