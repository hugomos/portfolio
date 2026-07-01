import type React from "react";
import { useCallback, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { useHero } from "@/modules/portfolio/hero/hooks/use-hero";
import { Separator } from "@/presentation/components/ui/separator";
import { HeroPageSkeleton } from "./@components/skeleton";

const INTRO_KEY = "hugomos-intro-seen";

export const PublicRootLayout: React.FC = () => {
	const location = useLocation();
	const { heroIsLoading } = useHero();

	const [isFirstVisit] = useState(
		() => localStorage.getItem(INTRO_KEY) !== "true",
	);
	const [introComplete, setIntroComplete] = useState(false);

	const handleIntroComplete = useCallback(() => {
		localStorage.setItem(INTRO_KEY, "true");
		setIntroComplete(true);
	}, []);

	const isIndex = location.pathname === "/";
	const showSkeleton =
		isIndex && isFirstVisit && (heroIsLoading || !introComplete);
	const isWaitingContent = isIndex && heroIsLoading;

	return (
		<div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10 md:px-8">
			{showSkeleton ? (
				<HeroPageSkeleton onComplete={handleIntroComplete} />
			) : isWaitingContent ? null : (
				<Outlet />
			)}
			{!showSkeleton && !isWaitingContent && (
				<footer className="mt-16">
					<Separator className="mb-6" />
					<p className="text-muted-foreground text-xs">
						© {new Date().getFullYear()} Vitor Hugo Oliveira
					</p>
				</footer>
			)}
		</div>
	);
};
