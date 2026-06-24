import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { WorkMode } from "../types";
import { company } from "./company";

export const experience = sqliteTable("experience", {
	id: text("id").primaryKey(),
	companyId: text("company_id")
		.notNull()
		.references(() => company.id, { onDelete: "restrict" }),
	role: text("role").notNull(),
	workMode: text("work_mode").$type<WorkMode>().notNull(),
	startDate: text("start_date").notNull(),
	endDate: text("end_date"),
	visible: integer("visible", { mode: "boolean" }).notNull().default(false),
	createdAt: text("created_at").notNull(),
	updatedAt: text("updated_at").notNull(),
});
