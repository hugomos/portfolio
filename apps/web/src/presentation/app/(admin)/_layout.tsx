import type React from "react";
import { Outlet } from "react-router";
import { Header } from "./@components/header";

export const AdminRootLayout: React.FC = () => {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />

			<div className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6 sm:py-10 md:px-8">
				<Outlet />
			</div>
		</div>
	);
};
