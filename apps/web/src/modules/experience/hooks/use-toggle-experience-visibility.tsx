interface UseToggleExperienceVisibility {
	handleToggleExperienceVisibility: ({
		id,
		visible,
	}: {
		id: string;
		visible: boolean;
	}) => Promise<{ id: string }>;
	toggleExperienceVisibilityIsPending: boolean;
}

export function useToggleExperienceVisibility(): UseToggleExperienceVisibility {
	return {
		handleToggleExperienceVisibility: ({
			id,
		}: {
			id: string;
			visible: boolean;
		}) => new Promise((resolve) => resolve({ id })),
		toggleExperienceVisibilityIsPending: false,
	};
}
