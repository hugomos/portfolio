import { useMutation } from "@tanstack/react-query";
import { signOut } from "../api/sign-out";

interface UseSignOut {
	handleSignOut: () => Promise<void>;
	signOutIsPending: boolean;
}

export function useSignOut(): UseSignOut {
	const { mutateAsync: handleSignOut, isPending: signOutIsPending } = useMutation({
		mutationFn: signOut,
	});

	return { handleSignOut, signOutIsPending };
}
