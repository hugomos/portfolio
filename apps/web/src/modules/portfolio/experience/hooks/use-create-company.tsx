import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCompany, type CreateCompanyInput } from "../api/create-company";

interface UseCreateCompany {
	handleCreateCompany: (data: CreateCompanyInput) => Promise<{ id: string }>;
	createCompanyIsPending: boolean;
}

export function useCreateCompany(): UseCreateCompany {
	const queryClient = useQueryClient();

	const { mutateAsync: handleCreateCompany, isPending: createCompanyIsPending } =
		useMutation({
			mutationFn: createCompany,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["companies"] });
			},
			onError: () => {
				toast.error("Erro ao criar empresa");
			},
		});

	return { handleCreateCompany, createCompanyIsPending };
}
