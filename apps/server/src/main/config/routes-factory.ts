import type { FastifyInstance } from "fastify";
import { register as registerAuthentication } from "@/modules/identity/features/authentication/routes";
import { register as registerUser } from "@/modules/identity/features/user/routes";
import { register as registerExperience } from "@/modules/portfolio/features/experience/routes";
import { register as registerHero } from "@/modules/portfolio/features/hero/routes";
import { register as registerProject } from "@/modules/portfolio/features/project/routes";

const routeModules = [
	registerAuthentication,
	registerUser,
	registerExperience,
	registerHero,
	registerProject,
];

function logRegisteredRoutes(collected: { method: string; url: string }[]) {
	const groups = new Map<string, { method: string; url: string }[]>();

	for (const { method, url } of collected) {
		const segments = url.replace(/^\/api\//, "").split("/");
		const context = segments[0] ?? "root";

		if (!groups.has(context)) groups.set(context, []);
		groups.get(context)?.push({ method, url: url.replace("/api", "") });
	}

	const lines: string[] = [""];

	for (const [context, routes] of [...groups.entries()].sort()) {
		lines.push(`[${context}]`);
		for (const { method, url } of routes) {
			lines.push(`  ${method.padEnd(7)} ${url}`);
		}
		lines.push("");
	}

	console.log(lines.join("\n"));
}

export async function registerRoutes(app: FastifyInstance) {
	const collected: { method: string; url: string }[] = [];

	app.addHook("onRoute", (routeOptions) => {
		const { method, url } = routeOptions;

		if (!url.startsWith("/api/") || url.startsWith("/api/docs")) return;
		if (method === "HEAD" || (Array.isArray(method) && method.includes("HEAD")))
			return;

		const methods = Array.isArray(method) ? method : [method];
		for (const m of methods) {
			collected.push({ method: m, url });
		}
	});

	for (const route of routeModules) {
		await app.register(
			async (moduleApp) => {
				await route(moduleApp);
			},
			{ prefix: "/api" },
		);
	}

	app.addHook("onReady", () => logRegisteredRoutes(collected));
}
