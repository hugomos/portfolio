import type React from "react";
import { useCallback, useEffect, useState } from "react";
import {
	TerminalCard,
	TerminalCursor,
	TerminalLine,
} from "@/presentation/components/terminal-card";

const LINES = [
	{ prefix: "$", command: "portfolio --start" },
	{ prefix: ">", command: "mounting routes..." },
	{ prefix: ">", command: "loading dependencies..." },
	{ prefix: ">", command: "GET /api/hero" },
] as const;

const DELAY_MS = 380;
const COMPLETE_DELAY_MS = 700;

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
			<TerminalCard className="max-w-sm">
				{LINES.slice(0, count).map((line, i) => (
					<TerminalLine
						key={line.command}
						prefix={line.prefix}
						prefixClassName={i === 0 ? "text-emerald-400" : "text-zinc-600"}
					>
						<span className={i === 0 ? "" : "text-zinc-500"}>
							{line.command}
							{i === count - 1 && <TerminalCursor />}
						</span>
					</TerminalLine>
				))}
			</TerminalCard>
		</div>
	);
};
