import type React from "react";
import { FormProvider } from "react-hook-form";
import { useParams } from "react-router";
import type { ExperienceDTO } from "@/modules/portfolio/experience/dto";
import { useExperiences } from "@/modules/portfolio/experience/hooks/use-experiences";
import { SectionTitle } from "@/presentation/components/section-title";
import { EditExperienceForm } from "./components/edit-experience-form";
import { useEditExperienceForm } from "./components/edit-experience-form/use-edit-experience-form";

const EditExperienceContent: React.FC<{ experience: ExperienceDTO }> = ({
	experience,
}) => {
	const form = useEditExperienceForm(experience);
	return (
		<main className="space-y-8">
			<SectionTitle as="h1">Edit experience</SectionTitle>
			<FormProvider {...form}>
				<EditExperienceForm id={experience.id} />
			</FormProvider>
		</main>
	);
};

export const EditExperience: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	const { experiences } = useExperiences({});
	const experience = experiences?.find((exp) => exp.id === id);

	if (!experience) {
		return (
			<main className="space-y-8">
				<SectionTitle as="h1">Edit experience</SectionTitle>
				<p className="text-muted-foreground text-sm">Experience not found.</p>
			</main>
		);
	}

	return <EditExperienceContent key={experience.id} experience={experience} />;
};
