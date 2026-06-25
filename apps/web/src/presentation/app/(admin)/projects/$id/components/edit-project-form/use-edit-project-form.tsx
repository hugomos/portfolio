import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";
import type { ProjectDTO } from "@/modules/portfolio/project/dto";
import { type EditProjectFormSchema, editProjectFormSchema } from "./schema";

export function useEditProjectForm(project: ProjectDTO) {
	return useForm<EditProjectFormSchema>({
		resolver: standardSchemaResolver(editProjectFormSchema),
		defaultValues: {
			title: project.title,
			category: project.category,
			status: project.status,
			summary: project.summary,
			impact: project.impact ?? "",
			tech: project.tech ?? [],
			repositoryUrl: project.repositoryUrl,
			liveUrl: project.liveUrl,
			highlights:
				project.highlights?.map((h) => ({
					content: h.content,
					sortOrder: h.sortOrder,
				})) ?? [],
			content: project.content,
			visible: project.visible,
		},
	});
}
