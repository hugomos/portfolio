import type React from "react";
import { FormProvider } from "react-hook-form";
import { SectionTitle } from "@/presentation/components/section-title";
import { CreateExperienceForm } from "./components/create-experience-form";
import { useCreateExperienceForm } from "./components/create-experience-form/use-create-experience-form";

export const NewExperience: React.FC = () => {
	const form = useCreateExperienceForm();

	return (
		<main className="space-y-8">
			<SectionTitle as="h1">New experience</SectionTitle>
			<FormProvider {...form}>
				<CreateExperienceForm />
			</FormProvider>
		</main>
	);
};
