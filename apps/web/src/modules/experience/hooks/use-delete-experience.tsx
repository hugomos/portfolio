interface UseDeleteExperience {
	handleDeleteExperience: ({ id }: { id: string }) => Promise<{ id: string }>;
	deleteExperienceIsPending: boolean;
}

export function useDeleteExperience(): UseDeleteExperience {
	return {
		handleDeleteExperience: ({ id }: { id: string }) =>
			new Promise((resolve) => resolve({ id })),
		deleteExperienceIsPending: false,
	};
}
