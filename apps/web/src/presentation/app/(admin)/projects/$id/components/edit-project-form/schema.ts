import { z } from "zod";

const optionalUrl = z.preprocess(
	(val) => (val === "" ? undefined : val),
	z.url().optional(),
);

export const editProjectFormSchema = z.object({
	title: z.string().min(1, "Title is required"),
	category: z.enum(["fullstack", "frontend", "backend", "cli", "mobile"]),
	status: z.enum(["active", "wip", "archived"]),
	summary: z.string().min(1, "Summary is required"),
	impact: z.string().optional(),
	tech: z.array(z.string()),
	repositoryUrl: optionalUrl,
	liveUrl: optionalUrl,
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
