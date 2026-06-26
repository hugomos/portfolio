import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";
import {
	type CreateExperienceFormSchema,
	createExperienceFormSchema,
} from "./schema";

export function useCreateExperienceForm() {
	return useForm<CreateExperienceFormSchema>({
		resolver: standardSchemaResolver(createExperienceFormSchema),
		defaultValues: {
			companyId: "",
			role: "",
			workMode: "remote",
			startDate: "",
			endDate: "",
			highlights: [],
			visible: false,
		},
	});
}
