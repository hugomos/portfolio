"use client";

import type React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "@/modules/identity/user/hooks/useMe";
import { SectionLoadingSkeleton } from "@/presentation/components/section-loading-skeleton";

interface RedirectIfAuthenticatedProps {
	children: React.ReactNode;
}

export const RedirectIfAuthenticated: React.FC<
	RedirectIfAuthenticatedProps
> = ({ children }) => {
	const router = useRouter();
	const { user, userIsLoading } = useMe();

	useEffect(() => {
		if (!userIsLoading && user) {
			router.replace("/~/admin");
		}
	}, [router, user, userIsLoading]);

	if (userIsLoading) return <SectionLoadingSkeleton />;
	if (user) return null;

	return <>{children}</>;
};
