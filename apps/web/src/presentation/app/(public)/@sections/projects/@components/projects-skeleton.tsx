import type React from "react";
import { SectionTitle } from "@/presentation/components/section-title";
import { Separator } from "@/presentation/components/ui/separator";
import { Skeleton } from "@/presentation/components/ui/skeleton";

export const ProjectsSkeleton: React.FC = () => {
	return (
		<div className="space-y-8">
			<SectionTitle as="h2">Projects</SectionTitle>
			<div className="space-y-10">
				{[0, 1, 2].map((g) => (
					<div key={g} className="space-y-4">
						<Skeleton className="h-3 w-16" />
						<div className="space-y-6">
							{[0, 1].map((p, pi, arr) => (
								<div key={p} className="space-y-6">
									<div className="space-y-2">
										<Skeleton className="h-3.5 w-40" />
										<Skeleton className="h-3 w-full" />
										<Skeleton className="h-3 w-4/5" />
										<div className="flex gap-1.5 pt-1">
											<Skeleton className="h-5 w-16 rounded" />
											<Skeleton className="h-5 w-20 rounded" />
											<Skeleton className="h-5 w-14 rounded" />
										</div>
									</div>
									{pi < arr.length - 1 && <Separator />}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
