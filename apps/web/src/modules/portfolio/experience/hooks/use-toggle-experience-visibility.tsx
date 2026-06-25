import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toggleExperienceActive } from "../api/toggle-active";

interface UseToggleExperienceVisibility {
	handleToggleExperienceVisibility: (id: string) => Promise<void>;
	toggleExperienceVisibilityIsPending: boolean;
}

export function useToggleExperienceVisibility(): UseToggleExperienceVisibility {
	const queryClient = useQueryClient();

	const {
		mutateAsync: handleToggleExperienceVisibility,
		isPending: toggleExperienceVisibilityIsPending,
	} = useMutation({
		mutationFn: toggleExperienceActive,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["experiences"] });
		},
		onError: () => {
			toast.error("Erro ao alterar visibilidade");
		},
	});

	return { handleToggleExperienceVisibility, toggleExperienceVisibilityIsPending };
}
