import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toggleProjectActive } from "../api/toggle-active";

interface UseToggleProjectVisibility {
	handleToggleProjectVisibility: (id: string) => Promise<void>;
	toggleProjectVisibilityIsPending: boolean;
}

export function useToggleProjectVisibility(): UseToggleProjectVisibility {
	const queryClient = useQueryClient();

	const {
		mutateAsync: handleToggleProjectVisibility,
		isPending: toggleProjectVisibilityIsPending,
	} = useMutation({
		mutationFn: toggleProjectActive,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
		},
		onError: () => {
			toast.error("Erro ao alterar visibilidade");
		},
	});

	return { handleToggleProjectVisibility, toggleProjectVisibilityIsPending };
}
