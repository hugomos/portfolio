interface UseUpdateExperienceProps {
	navigate: (path: string) => void;
}

interface UseUpdateExperience {
	handleUpdateExperience: (data: any) => Promise<{ id: string }>;
	updateExperienceIsPending: boolean;
}

export function useUpdateExperience(
	_: UseUpdateExperienceProps,
): UseUpdateExperience {
	return {
		handleUpdateExperience: () => new Promise((resolve) => resolve({ id: "" })),
		updateExperienceIsPending: false,
	};
}
