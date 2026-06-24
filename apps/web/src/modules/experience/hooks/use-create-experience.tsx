interface useCreateExperienceProps {
	navigate: (path: string) => void;
}

interface UseCreateExperience {
	handleCreateExperience: (data: any) => Promise<{ id: string }>;
	createExperienceIsPending: boolean;
}

export function useCreateExperience(
	_: useCreateExperienceProps,
): UseCreateExperience {
	return {
		handleCreateExperience: () => new Promise((resolve) => resolve({ id: "" })),
		createExperienceIsPending: false,
	};
}
