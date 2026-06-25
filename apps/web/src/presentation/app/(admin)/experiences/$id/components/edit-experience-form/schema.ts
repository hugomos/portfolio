import { z } from "zod";

export const editExperienceFormSchema = z
	.object({
		companyId: z.string().min(1, "Select a company"),
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
