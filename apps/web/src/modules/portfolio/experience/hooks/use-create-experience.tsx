import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type CreateExperienceInput, createExperience } from "../api/create";
import { replaceExperienceHighlights } from "../api/replace-highlights";

type CreateExperienceWithHighlightsInput = CreateExperienceInput & {
	highlights: Array<{ content: string; sortOrder: number }>;
};

interface UseCreateExperienceProps {
	navigate: (path: string) => void;
}

interface UseCreateExperience {
	handleCreateExperience: (
		data: CreateExperienceWithHighlightsInput,
	) => Promise<void>;
	createExperienceIsPending: boolean;
}

export function useCreateExperience({
	navigate,
}: UseCreateExperienceProps): UseCreateExperience {
	const queryClient = useQueryClient();

	const {
		mutateAsync: handleCreateExperience,
		isPending: createExperienceIsPending,
	} = useMutation({
		mutationFn: async ({
			highlights,
			...input
		}: CreateExperienceWithHighlightsInput) => {
			const { id } = await createExperience(input);
			if (highlights.length > 0) {
				await replaceExperienceHighlights({ experienceId: id, highlights });
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["experiences"] });
			toast.success("Experiência criada com sucesso");
			navigate("/~/admin/experiences");
		},
		onError: () => {
			toast.error("Erro ao criar experiência");
		},
	});

	return { handleCreateExperience, createExperienceIsPending };
}
