import type React from "react";
import { Outlet } from "react-router";

export const PublicRootLayout: React.FC = () => {
	return (
		<div className="mx-auto max-w-2xl space-y-8 px-4 py-8 sm:px-6 sm:py-10 md:px-8">
			<Outlet />
		</div>
	);
};
