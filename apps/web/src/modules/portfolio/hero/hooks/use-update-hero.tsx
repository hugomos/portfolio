import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type UpdateHeroInput, updateHero } from "../api/update";

interface UseUpdateHero {
	handleUpdateHero: (data: UpdateHeroInput) => Promise<void>;
	updateHeroIsPending: boolean;
}

export function useUpdateHero(): UseUpdateHero {
	const queryClient = useQueryClient();

	const { mutateAsync: handleUpdateHero, isPending: updateHeroIsPending } =
		useMutation({
			mutationFn: updateHero,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["hero"] });
				toast.success("Hero atualizado com sucesso");
			},
			onError: () => {
				toast.error("Erro ao atualizar hero");
			},
		});

	return { handleUpdateHero, updateHeroIsPending };
}
