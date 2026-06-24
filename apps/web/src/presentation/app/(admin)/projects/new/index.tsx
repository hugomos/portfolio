import type React from "react";
import { FormProvider } from "react-hook-form";
import { SectionTitle } from "@/presentation/components/section-title";
import { CreateProjectForm } from "./components/create-project-form";
import { useCreateProjectForm } from "./components/create-project-form/use-create-project-form";

export const NewProject: React.FC = () => {
	const form = useCreateProjectForm();

	return (
		<main className="space-y-8">
			<SectionTitle as="h1">New project</SectionTitle>
			<FormProvider {...form}>
				<CreateProjectForm />
			</FormProvider>
		</main>
	);
};
