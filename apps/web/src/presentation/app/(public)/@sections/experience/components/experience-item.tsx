import { Badge } from "@/presentation/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import type React from "react";
import { Link } from "react-router";
import { formatDate } from "../utils/date";

interface Experience {
	id: string;
	company: {
		name: string;
		website?: string | null;
	};
	role: string;
	workMode: "remote" | "hybrid" | "onsite";
	startDate: string;
	endDate?: string | null;
	highlights: {
		id: string;
		content: string;
		sortOrder: number;
	}[];
}

const workModeLabel: Record<Experience["workMode"], string> = {
	remote: "Remoto",
	hybrid: "Híbrido",
	onsite: "Presencial",
};


interface ExperienceItemProps {
	experience: Experience;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({
	experience,
}) => {
	const { company, role, workMode, startDate, endDate, highlights } =
		experience;

	const start = formatDate(startDate);
	const end = endDate ? formatDate(endDate) : "presente";

	return (
		<article className="grid gap-4 sm:grid-cols-[160px_1fr]">
			<div className="flex flex-col gap-1.5">
				{company.website ? (
					<Link
						to={company.website}
						target="_blank"
						rel="noopener noreferrer"
						className="group inline-flex items-center gap-1 text-sm font-medium hover:underline"
					>
						{company.name}
						<ArrowUpRight className="size-3 text-muted-foreground transition-colors group-hover:text-foreground" />
					</Link>
				) : (
					<span className="text-sm font-medium">{company.name}</span>
				)}
				<p className="text-xs text-muted-foreground">
					{start} – {end}
				</p>
				<Badge variant="outline" className="w-fit text-xs">
					{workModeLabel[workMode]}
				</Badge>
			</div>

			<div className="space-y-2">
				<p className="text-sm font-medium">{role}</p>
				<ul className="space-y-1">
					{highlights.map((h) => (
						<li
							key={h.id}
							className="flex gap-2 text-sm text-muted-foreground"
						>
							<span
								aria-hidden="true"
								className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/40"
							/>
							<span>{h.content}</span>
						</li>
					))}
				</ul>
			</div>
		</article>
	);
};
