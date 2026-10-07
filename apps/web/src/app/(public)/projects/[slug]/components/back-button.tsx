"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
	const router = useRouter();
	return (
		<button
			type="button"
			onClick={() => router.back()}
			className="inline-flex items-center gap-1.5 text-muted-foreground text-xs transition-colors hover:text-foreground"
		>
			<ArrowLeft className="size-3" />
			back
		</button>
	);
}
