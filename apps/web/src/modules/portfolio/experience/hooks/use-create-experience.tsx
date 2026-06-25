import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createExperience, type CreateExperienceInput } from "../api/create";

interface UseCreateExperienceProps {
	navigate: (path: string) => void;
}

interface UseCreateExperience {
	handleCreateExperience: (data: CreateExperienceInput) => Promise<void>;
	createExperienceIsPending: boolean;
}

export function useCreateExperience({ navigate }: UseCreateExperienceProps): UseCreateExperience {
	const queryClient = useQueryClient();

	const { mutateAsync: handleCreateExperience, isPending: createExperienceIsPending } =
		useMutation({
			mutationFn: createExperience,
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
