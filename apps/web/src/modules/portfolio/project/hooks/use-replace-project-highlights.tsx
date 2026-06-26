import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
	type ReplaceProjectHighlightsInput,
	replaceProjectHighlights,
} from "../api/replace-highlights";

interface UseReplaceProjectHighlights {
	handleReplaceProjectHighlights: (
		data: ReplaceProjectHighlightsInput,
	) => Promise<void>;
	replaceProjectHighlightsIsPending: boolean;
}

export function useReplaceProjectHighlights(): UseReplaceProjectHighlights {
	const queryClient = useQueryClient();

	const {
		mutateAsync: handleReplaceProjectHighlights,
		isPending: replaceProjectHighlightsIsPending,
	} = useMutation({
		mutationFn: replaceProjectHighlights,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
		},
		onError: () => {
			toast.error("Erro ao atualizar highlights");
		},
	});

	return { handleReplaceProjectHighlights, replaceProjectHighlightsIsPending };
}
