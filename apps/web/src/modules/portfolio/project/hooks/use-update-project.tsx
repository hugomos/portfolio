import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProject, type UpdateProjectInput } from "../api/update";

interface UseUpdateProjectProps {
	navigate: (path: string) => void;
}

interface UseUpdateProject {
	handleUpdateProject: (data: UpdateProjectInput) => Promise<void>;
	updateProjectIsPending: boolean;
}

export function useUpdateProject({ navigate }: UseUpdateProjectProps): UseUpdateProject {
	const queryClient = useQueryClient();

	const { mutateAsync: handleUpdateProject, isPending: updateProjectIsPending } =
		useMutation({
			mutationFn: updateProject,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["projects"] });
				toast.success("Projeto atualizado com sucesso");
				navigate("/~/admin/projects");
			},
			onError: () => {
				toast.error("Erro ao atualizar projeto");
			},
		});

	return { handleUpdateProject, updateProjectIsPending };
}
