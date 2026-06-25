import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./user";

export const refreshToken = sqliteTable(
	"refresh_token",
	{
		id: text("id").primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		tokenHash: text("token_hash").notNull().unique(),
		createdAt: text("created_at").notNull(),
		expiresAt: text("expires_at").notNull(),
		usedAt: text("used_at"),
	},
	(t) => [
		index("refresh_token_user_id_idx").on(t.userId),
		index("refresh_token_token_hash_idx").on(t.tokenHash),
	]
);
