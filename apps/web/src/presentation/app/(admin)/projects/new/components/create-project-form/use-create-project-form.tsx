import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";
import {
	type CreateProjectFormSchema,
	createProjectFormSchema,
} from "./schema";

export function useCreateProjectForm() {
	return useForm<CreateProjectFormSchema>({
		resolver: standardSchemaResolver(createProjectFormSchema),
		defaultValues: {
			title: "",
			category: "fullstack",
			status: "active",
			summary: "",
			impact: "",
			tech: [],
			repositoryUrl: undefined,
			liveUrl: undefined,
			highlights: [],
			content: undefined,
			visible: false,
		},
	});
}
