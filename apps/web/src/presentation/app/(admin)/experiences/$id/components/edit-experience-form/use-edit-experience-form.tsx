import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";
import type { ExperienceDTO } from "@/modules/portfolio/experience/dto";
import {
	type EditExperienceFormSchema,
	editExperienceFormSchema,
} from "./schema";

export function useEditExperienceForm(experience: ExperienceDTO) {
	return useForm<EditExperienceFormSchema>({
		resolver: standardSchemaResolver(editExperienceFormSchema),
		defaultValues: {
			companyName: experience.company.name,
			companyWebsite: experience.company.website,
			role: experience.role,
			workMode: experience.workMode,
			startDate: new Date(experience.startDate),
			endDate: experience.endDate ? new Date(experience.endDate) : undefined,
			highlights: experience.highlights.map((h) => ({
				content: h.content,
				sortOrder: h.sortOrder,
			})),
			visible: experience.visible,
		},
	});
}
