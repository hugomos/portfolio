import type React from "react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

export const AuthGuard: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	// const { user, userIsLoading } = useMe()
	const user = { name: "john doe", email: "yTtI2@example.com" };
	const userIsLoading = false;

	useEffect(() => {
		if (!userIsLoading && !user) {
			navigate("/auth/sign-in", { replace: true, state: { from: location } });
		}
	}, [user, navigate, location]);

	if (userIsLoading) {
		return (
			// criar skeleton
			<div>Loading...</div>
		);
	}

	if (!user) return null;

	return <Outlet />;
};
