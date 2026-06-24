interface UseCreateExperience {
	handleCreateExperience: () => Promise<{ id: string }>;
	createExperienceIsPending: boolean;
}

export function useCreateExperience(): UseCreateExperience {
	return {
		handleCreateExperience: () => new Promise((resolve) => resolve({ id: "" })),
		createExperienceIsPending: false,
	};
}
