import type React from "react";
import { cn } from "@/presentation/lib/utils";

interface TerminalCardProps {
	title?: string;
	children: React.ReactNode;
	className?: string;
}

export const TerminalCard: React.FC<TerminalCardProps> = ({
	title = "bash",
	children,
	className,
}) => {
	return (
		<div
			className={cn(
				"w-full max-w-xs overflow-hidden border border-zinc-800 bg-zinc-950 shadow-black/50 shadow-xl",
				className,
			)}
		>
			<div className="flex items-center border-zinc-800 border-b bg-zinc-900 px-4 py-2">
				<span className="text-xs text-zinc-500">{title}</span>
			</div>
			<div className="space-y-1.5 p-5 font-mono text-sm">{children}</div>
		</div>
	);
};

export const TerminalLine: React.FC<{
	prefix?: string;
	prefixClassName?: string;
	children: React.ReactNode;
}> = ({ prefix = "$", prefixClassName = "text-emerald-400", children }) => {
	return (
		<div className="flex items-baseline gap-2.5">
			<span className={prefixClassName}>{prefix}</span>
			<span className="text-zinc-100">{children}</span>
		</div>
	);
};

export const TerminalCursor: React.FC = () => (
	<span className="ml-1 inline-block animate-pulse select-none text-zinc-100">
		_
	</span>
);
