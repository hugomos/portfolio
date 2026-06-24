interface UseToggleProjectVisibility {
	handleToggleProjectVisibility: ({
		id,
		visible,
	}: {
		id: string;
		visible: boolean;
	}) => Promise<{ id: string }>;
	toggleProjectVisibilityIsPending: boolean;
}

export function useToggleProjectVisibility(): UseToggleProjectVisibility {
	return {
		handleToggleProjectVisibility: ({ id }: { id: string; visible: boolean }) =>
			new Promise((resolve) => resolve({ id })),
		toggleProjectVisibilityIsPending: false,
	};
}
