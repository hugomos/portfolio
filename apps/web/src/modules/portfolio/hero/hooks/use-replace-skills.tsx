import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type ReplaceSkillsInput, replaceSkills } from "../api/replace-skills";

interface UseReplaceSkills {
	handleReplaceSkills: (data: ReplaceSkillsInput) => Promise<void>;
	replaceSkillsIsPending: boolean;
}

export function useReplaceSkills(): UseReplaceSkills {
	const queryClient = useQueryClient();

	const {
		mutateAsync: handleReplaceSkills,
		isPending: replaceSkillsIsPending,
	} = useMutation({
		mutationFn: replaceSkills,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["hero"] });
			toast.success("Skills atualizadas com sucesso");
		},
		onError: () => {
			toast.error("Erro ao atualizar skills");
		},
	});

	return { handleReplaceSkills, replaceSkillsIsPending };
}
