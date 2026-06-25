import { z } from "zod";

const optionalUrl = z.preprocess(
	(val) => (val === "" ? undefined : val),
	z.url().optional(),
);

export const editExperienceFormSchema = z
	.object({
		companyName: z.string(),
		companyWebsite: optionalUrl,
		role: z.string(),
		workMode: z.enum(["remote", "hybrid", "onsite"]),
		startDate: z.date(),
		endDate: z.date().optional(),
		highlights: z.array(
			z.object({
				content: z.string(),
				sortOrder: z.number(),
			}),
		),
		visible: z.boolean(),
	})
	.refine((data) => {
		if (data.endDate) {
			return data.endDate > data.startDate;
		}
		return true;
	}, "End date must be after start date");

export type EditExperienceFormSchema = z.infer<typeof editExperienceFormSchema>;
