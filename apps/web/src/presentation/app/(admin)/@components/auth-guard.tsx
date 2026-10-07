"use client";

import type React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "@/modules/identity/user/hooks/useMe";
import { SectionLoadingSkeleton } from "@/presentation/components/section-loading-skeleton";

interface AuthGuardProps {
	children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
	const router = useRouter();
	const { user, userIsLoading } = useMe();

	useEffect(() => {
		if (!userIsLoading && !user) {
			router.replace("/auth/sign-in");
		}
	}, [router, user, userIsLoading]);

	if (userIsLoading) return <SectionLoadingSkeleton />;
	if (!user) return null;

	return <>{children}</>;
};
