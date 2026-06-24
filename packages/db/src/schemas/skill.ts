import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { hero } from "./hero";

export const skill = sqliteTable("skill", {
	id: text("id").primaryKey(),
	heroId: text("hero_id")
		.notNull()
		.references(() => hero.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	sortOrder: integer("sort_order").notNull(),
});
