import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type UpdateExperienceInput, updateExperience } from "../api/update";
import { replaceExperienceHighlights } from "../api/replace-highlights";

type UpdateExperienceWithHighlightsInput = UpdateExperienceInput & {
	highlights: Array<{ content: string; sortOrder: number }>;
};

interface UseUpdateExperienceProps {
	navigate: (path: string) => void;
}

interface UseUpdateExperience {
	handleUpdateExperience: (
		data: UpdateExperienceWithHighlightsInput,
	) => Promise<void>;
	updateExperienceIsPending: boolean;
}

export function useUpdateExperience({
	navigate,
}: UseUpdateExperienceProps): UseUpdateExperience {
	const queryClient = useQueryClient();

	const {
		mutateAsync: handleUpdateExperience,
		isPending: updateExperienceIsPending,
	} = useMutation({
		mutationFn: async ({
			highlights,
			...input
		}: UpdateExperienceWithHighlightsInput) => {
			await updateExperience(input);
			await replaceExperienceHighlights({
				experienceId: input.id,
				highlights,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["experiences"] });
			toast.success("Experiência atualizada com sucesso");
			navigate("/~/admin/experiences");
		},
		onError: () => {
			toast.error("Erro ao atualizar experiência");
		},
	});

	return { handleUpdateExperience, updateExperienceIsPending };
}
