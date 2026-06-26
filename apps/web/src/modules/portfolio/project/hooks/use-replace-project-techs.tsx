import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
	type ReplaceProjectTechsInput,
	replaceProjectTechs,
} from "../api/replace-techs";

interface UseReplaceProjectTechs {
	handleReplaceProjectTechs: (data: ReplaceProjectTechsInput) => Promise<void>;
	replaceProjectTechsIsPending: boolean;
}

export function useReplaceProjectTechs(): UseReplaceProjectTechs {
	const queryClient = useQueryClient();

	const {
		mutateAsync: handleReplaceProjectTechs,
		isPending: replaceProjectTechsIsPending,
	} = useMutation({
		mutationFn: replaceProjectTechs,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
		},
		onError: () => {
			toast.error("Erro ao atualizar techs");
		},
	});

	return { handleReplaceProjectTechs, replaceProjectTechsIsPending };
}
