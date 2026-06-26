import type React from "react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useMe } from "@/modules/identity/user/hooks/useMe";
import { SectionLoadingSkeleton } from "@/presentation/components/section-loading-skeleton";

export const AuthGuard: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { user, userIsLoading } = useMe();

	useEffect(() => {
		if (!userIsLoading && !user) {
			navigate("/auth/sign-in", { replace: true, state: { from: location } });
		}
	}, [navigate, location, user, userIsLoading]);

	if (userIsLoading) {
		return <SectionLoadingSkeleton />;
	}

	if (!user) return null;

	return <Outlet />;
};
