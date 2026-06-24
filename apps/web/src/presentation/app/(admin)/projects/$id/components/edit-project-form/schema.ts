import { z } from "zod";

export const editProjectFormSchema = z.object({
	title: z.string().min(1, "Title is required"),
	category: z.enum(["fullstack", "frontend", "backend", "cli", "mobile"]),
	status: z.enum(["active", "wip", "archived"]),
	summary: z.string().min(1, "Summary is required"),
	impact: z.string().optional(),
	tech: z.array(z.string()),
	repositoryUrl: z.url().optional(),
	liveUrl: z.url().optional(),
	highlights: z.array(
		z.object({
			content: z.string(),
			sortOrder: z.number(),
		}),
	),
	content: z.string().optional(),
	visible: z.boolean(),
});

export type EditProjectFormSchema = z.infer<typeof editProjectFormSchema>;
