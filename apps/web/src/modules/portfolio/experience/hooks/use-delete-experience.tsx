import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteExperience } from "../api/delete";

interface UseDeleteExperience {
	handleDeleteExperience: (id: string) => Promise<void>;
	deleteExperienceIsPending: boolean;
}

export function useDeleteExperience(): UseDeleteExperience {
	const queryClient = useQueryClient();

	const { mutateAsync: handleDeleteExperience, isPending: deleteExperienceIsPending } =
		useMutation({
			mutationFn: deleteExperience,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["experiences"] });
				toast.success("Experiência removida com sucesso");
			},
			onError: () => {
				toast.error("Erro ao remover experiência");
			},
		});

	return { handleDeleteExperience, deleteExperienceIsPending };
}
