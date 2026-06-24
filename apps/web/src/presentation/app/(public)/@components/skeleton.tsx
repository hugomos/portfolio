import type React from "react";
import { useCallback, useEffect, useState } from "react";

const LINES = [
	{ prefix: "$", command: "portfolio --start" },
	{ prefix: ">", command: "mounting routes..." },
	{ prefix: ">", command: "loading dependencies..." },
	{ prefix: ">", command: "GET /api/hero" },
] as const;

const DELAY_MS = 380;
const COMPLETE_DELAY_MS = 600;

interface HeroPageSkeletonProps {
	onComplete?: () => void;
}

export const HeroPageSkeleton: React.FC<HeroPageSkeletonProps> = ({
	onComplete,
}) => {
	const [count, setCount] = useState(1);

	useEffect(() => {
		if (count >= LINES.length) return;
		const t = setTimeout(() => setCount((c) => c + 1), DELAY_MS);
		return () => clearTimeout(t);
	}, [count]);

	const handleComplete = useCallback(() => onComplete?.(), [onComplete]);

	useEffect(() => {
		if (count < LINES.length) return;
		const t = setTimeout(handleComplete, COMPLETE_DELAY_MS);
		return () => clearTimeout(t);
	}, [count, handleComplete]);

	return (
		<div className="flex min-h-[60vh] items-center justify-center">
			<div className="w-full max-w-sm overflow-hidden rounded-xl border border-border bg-card shadow-black/30 shadow-xl">
				<div className="flex items-center gap-1.5 border-border border-b px-4 py-3">
					<span className="size-3 rounded-full bg-red-400" />
					<span className="size-3 rounded-full bg-yellow-400" />
					<span className="size-3 rounded-full bg-green-400" />
				</div>
				<div className="space-y-1.5 p-5 font-mono text-sm">
					{LINES.slice(0, count).map((line, i) => (
						<div key={line.command} className="flex items-baseline gap-2.5">
							<span
								className={
									i === 0 ? "text-emerald-400" : "text-muted-foreground/40"
								}
							>
								{line.prefix}
							</span>
							<span
								className={
									i === 0 ? "text-foreground" : "text-muted-foreground"
								}
							>
								{line.command}
								{i === count - 1 && (
									<span className="ml-1 inline-block animate-pulse select-none">
										_
									</span>
								)}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
