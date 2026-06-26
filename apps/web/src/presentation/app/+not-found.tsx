import type React from "react";
import { Link } from "react-router";

export const NotFound: React.FC = () => {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-xs overflow-hidden rounded-xl border border-border bg-card shadow-black/30 shadow-xl">
				<div className="flex items-center gap-1.5 border-border border-b px-4 py-3">
					<span className="size-3 rounded-full bg-red-400" />
					<span className="size-3 rounded-full bg-yellow-400" />
					<span className="size-3 rounded-full bg-green-400" />
				</div>
				<div className="space-y-1.5 p-5 font-mono text-sm">
					<div className="flex items-baseline gap-2.5">
						<span className="text-emerald-400">$</span>
						<span className="text-foreground">portfolio --navigate</span>
					</div>
					<div className="flex items-baseline gap-2.5">
						<span className="text-muted-foreground/40">{">"}</span>
						<span className="text-red-400">Error: route not found (404)</span>
					</div>
					<div className="flex items-baseline gap-2.5">
						<span className="text-emerald-400">$</span>
						<Link to="/" className="text-foreground underline-offset-4 hover:underline">
							cd ~<span className="ml-1 inline-block animate-pulse select-none">_</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
