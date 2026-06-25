import type React from "react";
import { useHero } from "@/modules/portfolio/hero/hooks/use-hero";
import { Experience } from "./@sections/experience";
import { Hero } from "./@sections/hero";
import { Projects } from "./@sections/projects";

export const Index: React.FC = () => {
	const { hero } = useHero();

	if (!hero) return null;

	return (
		<main className="space-y-12">
			<Hero hero={hero} />
			<Experience />
			<Projects />
		</main>
	);
};
