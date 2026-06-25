import type React from "react";
import { FormProvider } from "react-hook-form";
import { useHero } from "@/modules/portfolio/hero/hooks/use-hero";
import { SectionTitle } from "@/presentation/components/section-title";
import { EditHeroForm } from "./components/edit-hero-form";
import { useEditHeroForm } from "./components/edit-hero-form/use-edit-hero-form";

const EditHeroContent: React.FC<{
	hero: NonNullable<ReturnType<typeof useHero>["hero"]>;
}> = ({ hero }) => {
	const form = useEditHeroForm(hero);
	return (
		<main className="space-y-8">
			<SectionTitle as="h1">Hero</SectionTitle>
			<FormProvider {...form}>
				<EditHeroForm />
			</FormProvider>
		</main>
	);
};

export const EditHero: React.FC = () => {
	const { hero } = useHero();

	if (!hero) {
		return (
			<main className="space-y-8">
				<SectionTitle as="h1">Hero</SectionTitle>
				<p className="text-muted-foreground text-sm">Hero not found.</p>
			</main>
		);
	}

	return <EditHeroContent key="hero" hero={hero} />;
};
