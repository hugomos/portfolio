import type React from "react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useMe } from "@/modules/identity/user/hooks/useMe";
import { SectionLoadingSkeleton } from "@/presentation/components/section-loading-skeleton";

export const RedirectIfAuthenticated: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { user, userIsLoading } = useMe();

	useEffect(() => {
		if (!userIsLoading && user) {
			navigate("/~/admin", { replace: true, state: { from: location } });
			return;
		}
	}, [navigate, location, user, userIsLoading]);

	if (userIsLoading) {
		return <SectionLoadingSkeleton />;
	}

	if (user) {
		return null;
	}

	return <Outlet />;
};
