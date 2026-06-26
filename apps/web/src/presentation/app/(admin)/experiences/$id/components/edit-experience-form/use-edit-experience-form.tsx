import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import type { ExperienceDTO } from "@/modules/portfolio/experience/dto";
import {
	type EditExperienceFormSchema,
	editExperienceFormSchema,
} from "./schema";

const DATE_FORMAT = "dd/MM/yyyy";

export function useEditExperienceForm(experience: ExperienceDTO) {
	return useForm<EditExperienceFormSchema>({
		resolver: standardSchemaResolver(editExperienceFormSchema),
		defaultValues: {
			companyId: experience.company.id,
			role: experience.role,
			workMode: experience.workMode,
			startDate: format(new Date(experience.startDate), DATE_FORMAT),
			endDate: experience.endDate
				? format(new Date(experience.endDate), DATE_FORMAT)
				: "",
			highlights: experience.highlights.map((h) => ({
				content: h.content,
				sortOrder: h.sortOrder,
			})),
			visible: experience.visible,
		},
	});
}
