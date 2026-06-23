import type React from "react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

export const RedirectIfAuthenticated: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	// const { user, userIsLoading } = useMe()
	const user = { name: "john doe", email: "yTtI2@example.com" };
	const userIsLoading = false;

	useEffect(() => {
		if (!userIsLoading && user) {
			navigate("/~/admin", { replace: true, state: { from: location } });
			return;
		}
	}, [navigate, location, user]);

	if (userIsLoading) {
		return (
			// criar skeleton
			<div>Loading...</div>
		);
	}

	if (user) {
		return null;
	}

	return <Outlet />;
};
