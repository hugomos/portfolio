import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type CreateProjectInput, createProject } from "../api/create";
import { replaceProjectHighlights } from "../api/replace-highlights";
import { replaceProjectSocialLinks } from "../api/replace-social-links";
import { replaceProjectTechs } from "../api/replace-techs";
import type { SocialPlatform } from "../dto";

type CreateProjectWithRelationsInput = CreateProjectInput & {
	highlights: Array<{ content: string; sortOrder: number }>;
	techs: Array<{ name: string; sortOrder: number }>;
	socialLinks: Array<{
		platform: SocialPlatform;
		username: string;
		sortOrder: number;
	}>;
};

interface UseCreateProjectProps {
	navigate: (path: string) => void;
}

interface UseCreateProject {
	handleCreateProject: (data: CreateProjectWithRelationsInput) => Promise<void>;
	createProjectIsPending: boolean;
}

export function useCreateProject({
	navigate,
}: UseCreateProjectProps): UseCreateProject {
	const queryClient = useQueryClient();

	const {
		mutateAsync: handleCreateProject,
		isPending: createProjectIsPending,
	} = useMutation({
		mutationFn: async ({
			highlights,
			techs,
			socialLinks,
			...input
		}: CreateProjectWithRelationsInput) => {
			const { id } = await createProject(input);
			await Promise.all([
				highlights.length > 0
					? replaceProjectHighlights({ projectId: id, highlights })
					: Promise.resolve(),
				techs.length > 0
					? replaceProjectTechs({ projectId: id, techs })
					: Promise.resolve(),
				socialLinks.length > 0
					? replaceProjectSocialLinks({ projectId: id, socialLinks })
					: Promise.resolve(),
			]);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			toast.success("Projeto criado com sucesso");
			navigate("/~/admin/projects");
		},
		onError: () => {
			toast.error("Erro ao criar projeto");
		},
	});

	return { handleCreateProject, createProjectIsPending };
}
