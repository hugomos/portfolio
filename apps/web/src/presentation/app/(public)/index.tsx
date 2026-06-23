import type React from "react";
import { Experience } from "./@sections/experience";
import { Hero } from "./@sections/hero";

export const Index: React.FC = () => {
	return (
		<main className="space-y-12">
			<Hero />
			<Experience />
		</main>
	);
};
