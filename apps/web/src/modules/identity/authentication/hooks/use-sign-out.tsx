import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "../api/sign-out";

interface UseSignOutProps {
	navigate: (path: string) => void;
}

interface UseSignOut {
	handleSignOut: () => Promise<void>;
	signOutIsPending: boolean;
}

export function useSignOut({ navigate }: UseSignOutProps): UseSignOut {
	const queryClient = useQueryClient();

	const { mutateAsync: handleSignOut, isPending: signOutIsPending } =
		useMutation({
			mutationFn: signOut,
			onSuccess: () => {
				queryClient.clear();
				navigate("/");
			},
		});

	return { handleSignOut, signOutIsPending };
}
