import type React from "react";
import { Outlet } from "react-router";

export const PublicRootLayout: React.FC = () => {
	return (
		<main className="mx-auto max-w-2xl px-8 py-10 md:px-10">
			<Outlet />
		</main>
	);
};
