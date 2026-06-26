import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type UpdateExperienceInput, updateExperience } from "../api/update";

interface UseUpdateExperienceProps {
	navigate: (path: string) => void;
}

interface UseUpdateExperience {
	handleUpdateExperience: (data: UpdateExperienceInput) => Promise<void>;
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
		mutationFn: updateExperience,
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
