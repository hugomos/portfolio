import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type CreateProjectInput, createProject } from "../api/create";

interface UseCreateProjectProps {
	navigate: (path: string) => void;
}

interface UseCreateProject {
	handleCreateProject: (data: CreateProjectInput) => Promise<void>;
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
		mutationFn: createProject,
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
