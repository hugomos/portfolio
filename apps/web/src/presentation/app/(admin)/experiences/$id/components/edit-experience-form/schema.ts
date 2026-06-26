import { format, isValid, parse } from "date-fns";
import { z } from "zod";

const DATE_FORMAT = "dd/MM/yyyy";

const dateString = z.string().refine((val) => {
	if (!val) return false;
	const parsed = parse(val, DATE_FORMAT, new Date());
	return isValid(parsed) && format(parsed, DATE_FORMAT) === val;
}, "Formato inválido (dd/mm/aaaa)");

export const editExperienceFormSchema = z
	.object({
		companyId: z.string().min(1, "Select a company"),
		role: z.string(),
		workMode: z.enum(["remote", "hybrid", "onsite"]),
		startDate: dateString,
		endDate: dateString.optional().or(z.literal("")),
		highlights: z.array(
			z.object({
				content: z.string(),
				sortOrder: z.number(),
			}),
		),
		visible: z.boolean(),
	})
	.refine((data) => {
		if (!data.endDate) return true;
		const start = parse(data.startDate, DATE_FORMAT, new Date());
		const end = parse(data.endDate, DATE_FORMAT, new Date());
		return end > start;
	}, "End date must be after start date");

export type EditExperienceFormSchema = z.infer<typeof editExperienceFormSchema>;
