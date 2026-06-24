interface UseUpdateExperience {
	handleUpdateExperience: () => Promise<{ id: string }>;
	updateExperienceIsPending: boolean;
}

export function useUpdateExperience(): UseUpdateExperience {
	return {
		handleUpdateExperience: () => new Promise((resolve) => resolve({ id: "" })),
		updateExperienceIsPending: false,
	};
}
