import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteProject } from "../api/delete";

interface UseDeleteProject {
	handleDeleteProject: (id: string) => Promise<void>;
	deleteProjectIsPending: boolean;
}

export function useDeleteProject(): UseDeleteProject {
	const queryClient = useQueryClient();

	const {
		mutateAsync: handleDeleteProject,
		isPending: deleteProjectIsPending,
	} = useMutation({
		mutationFn: deleteProject,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			toast.success("Projeto removido com sucesso");
		},
		onError: () => {
			toast.error("Erro ao remover projeto");
		},
	});

	return { handleDeleteProject, deleteProjectIsPending };
}
