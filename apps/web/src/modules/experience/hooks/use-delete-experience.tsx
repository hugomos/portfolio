interface UseDeleteExperience {
	handleDeleteExperience: () => Promise<{ id: string }>;
	deleteExperienceIsPending: boolean;
}

export function useDeleteExperience(): UseDeleteExperience {
	return {
		handleDeleteExperience: () => new Promise((resolve) => resolve({ id: "" })),
		deleteExperienceIsPending: false,
	};
}
