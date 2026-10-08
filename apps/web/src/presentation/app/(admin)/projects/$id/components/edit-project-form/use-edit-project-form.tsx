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
			tech: project.techs?.map((t) => t.name) ?? [],
			repositoryUrl: project.repositoryUrl ?? undefined,
			liveUrl: project.liveUrl ?? undefined,
			coverImageUrl: project.coverImageUrl ?? null,
			coverImageFileId: project.coverImageFileId ?? null,
			highlights:
				project.highlights?.map((h) => ({
					content: h.content,
					sortOrder: h.sortOrder,
				})) ?? [],
			socialLinks:
				project.socialLinks?.map((s) => ({
					platform: s.platform,
					username: s.username,
					sortOrder: s.sortOrder,
				})) ?? [],
			content: project.content ?? undefined,
			visible: project.visible,
		},
	});
}
