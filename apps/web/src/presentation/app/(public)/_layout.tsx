import type React from "react";
import { Outlet } from "react-router";
import { Separator } from "@/presentation/components/ui/separator";

export const PublicRootLayout: React.FC = () => {
	return (
		<div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10 md:px-8">
			<Outlet />
			<footer className="mt-16">
				<Separator className="mb-6" />
				<p className="text-muted-foreground text-xs">
					© {new Date().getFullYear()} Vitor Hugo Oliveira
				</p>
			</footer>
		</div>
	);
};
