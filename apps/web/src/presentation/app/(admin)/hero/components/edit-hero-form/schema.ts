import { z } from "zod";

const optionalUrl = z.preprocess(
	(val) => (val === "" ? undefined : val),
	z.url().optional(),
);

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
		resumeUrl: optionalUrl,
		githubUrl: optionalUrl,
		linkedinUrl: optionalUrl,
	}),
});

export type EditHeroFormSchema = z.infer<typeof editHeroFormSchema>;
