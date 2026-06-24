import { z } from "zod";

export const editHeroFormSchema = z.object({
	name: z.string(),
	title: z.string(),
	bio: z.string(),
	skills: z.array(
		z.object({
			name: z.string(),
			sortOrder: z.number(),
		}),
	),
	links: z.object({
		resumeUrl: z.url().optional(),
		githubUrl: z.url().optional(),
		linkedinUrl: z.url().optional(),
	}),
});

export type EditHeroFormSchema = z.infer<typeof editHeroFormSchema>;
