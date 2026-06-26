import type React from "react";
import { Link } from "react-router";
import {
	TerminalCard,
	TerminalCursor,
	TerminalLine,
} from "@/presentation/components/terminal-card";

export const NotFound: React.FC = () => {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<TerminalCard>
				<TerminalLine>portfolio --navigate</TerminalLine>
				<TerminalLine prefix=">" prefixClassName="text-zinc-600">
					<span className="text-red-400">Error: route not found (404)</span>
				</TerminalLine>
				<TerminalLine>
					<Link to="/" className="underline-offset-4 hover:underline">
						cd ~<TerminalCursor />
					</Link>
				</TerminalLine>
			</TerminalCard>
		</div>
	);
};
