import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
	type ReplaceProjectSocialLinksInput,
	replaceProjectSocialLinks,
} from "../api/replace-social-links";

interface UseReplaceProjectSocialLinks {
	handleReplaceProjectSocialLinks: (
		data: ReplaceProjectSocialLinksInput,
	) => Promise<void>;
	replaceProjectSocialLinksIsPending: boolean;
}

export function useReplaceProjectSocialLinks(): UseReplaceProjectSocialLinks {
	const queryClient = useQueryClient();

	const {
		mutateAsync: handleReplaceProjectSocialLinks,
		isPending: replaceProjectSocialLinksIsPending,
	} = useMutation({
		mutationFn: replaceProjectSocialLinks,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
		},
		onError: () => {
			toast.error("Erro ao atualizar redes sociais");
		},
	});

	return {
		handleReplaceProjectSocialLinks,
		replaceProjectSocialLinksIsPending,
	};
}
