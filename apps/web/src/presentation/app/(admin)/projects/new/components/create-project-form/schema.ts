import { z } from "zod";

const optionalUrl = z.preprocess(
	(val) => (val === "" ? undefined : val),
	z.url().optional(),
);

const socialPlatforms = [
	"instagram",
	"x",
	"linkedin",
	"github",
	"youtube",
	"tiktok",
] as const;

export const createProjectFormSchema = z.object({
	title: z.string().min(1, "Title is required"),
	category: z.enum(["fullstack", "frontend", "backend", "cli", "mobile"]),
	status: z.enum(["active", "wip", "archived"]),
	summary: z.string().min(1, "Summary is required"),
	impact: z.string().optional(),
	tech: z.array(z.string()),
	repositoryUrl: optionalUrl,
	liveUrl: optionalUrl,
	coverImageUrl: z.string().nullable().optional(),
	coverImageFileId: z.string().nullable().optional(),
	highlights: z.array(
		z.object({
			content: z.string(),
			sortOrder: z.number(),
		}),
	),
	socialLinks: z.array(
		z.object({
			platform: z.enum(socialPlatforms),
			username: z.string().min(1, "Username obrigatório"),
			sortOrder: z.number(),
		}),
	),
	content: z.string().optional(),
	visible: z.boolean(),
});

export type CreateProjectFormSchema = z.infer<typeof createProjectFormSchema>;
