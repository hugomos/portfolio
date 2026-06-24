import type React from "react";
import { useExperiences } from "@/modules/experience/hooks/use-experiences";
import { SectionTitle } from "@/presentation/components/section-title";
import { Separator } from "@/presentation/components/ui/separator";
import { ExperienceItem } from "./components/experience-item";

export const Experience: React.FC = () => {
	const { experiences } = useExperiences({ visible: true });

	return (
		<section className="space-y-6">
			<SectionTitle>Experience</SectionTitle>
			<div className="space-y-6">
				{experiences?.map((exp, index) => (
					<div key={exp.id} className="space-y-6">
						<ExperienceItem experience={exp} />
						{index < (experiences.length - 1) && <Separator />}
					</div>
				))}
			</div>
		</section>
	);
};
