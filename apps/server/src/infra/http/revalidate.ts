import { env } from "@portfolio/env/server";
import { logger } from "@/infra/logger";

export async function triggerRevalidation(): Promise<void> {
	try {
		const res = await fetch(`${env.WEB_URL}/api/revalidate`, {
			method: "POST",
			headers: {
				authorization: `Bearer ${env.REVALIDATION_SECRET}`,
			},
		});
		if (!res.ok) {
			logger.warn(`Revalidation returned ${res.status}`);
		}
	} catch (err) {
		logger.warn({ err }, "Revalidation request failed");
	}
}
