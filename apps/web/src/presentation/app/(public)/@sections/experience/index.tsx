import type React from "react";
import { SectionTitle } from "@/presentation/components/section-title";
import { Separator } from "@/presentation/components/ui/separator";
import { ExperienceItem } from "./components/experience-item";

const experiences = [
	{
		id: "1",
		company: { name: "Empresa X", website: "https://empresa-x.com" },
		role: "Software Engineer",
		workMode: "remote" as const,
		startDate: "2022-03-01",
		endDate: null,
		highlights: [
			{
				id: "h1",
				content:
					"Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.",
				sortOrder: 1,
			},
			{
				id: "h2",
				content:
					"Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi.",
				sortOrder: 2,
			},
			{
				id: "h3",
				content:
					"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
				sortOrder: 3,
			},
		],
	},
	{
		id: "2",
		company: { name: "Empresa Y", website: null },
		role: "Backend Developer",
		workMode: "hybrid" as const,
		startDate: "2020-01-01",
		endDate: "2022-02-28",
		highlights: [
			{
				id: "h4",
				content:
					"Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.",
				sortOrder: 1,
			},
			{
				id: "h5",
				content:
					"Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.",
				sortOrder: 2,
			},
		],
	},
];

export const Experience: React.FC = () => {
	return (
		<section className="space-y-6">
			<SectionTitle>Experience</SectionTitle>
			<div className="space-y-6">
				{experiences.map((exp, index) => (
					<div key={exp.id} className="space-y-6">
						<ExperienceItem experience={exp} />
						{index < experiences.length - 1 && <Separator />}
					</div>
				))}
			</div>
		</section>
	);
};
