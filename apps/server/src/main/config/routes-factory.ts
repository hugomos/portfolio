import * as fs from "node:fs";
import * as path from "node:path";
import type { FastifyInstance } from "fastify";

type RouteModule = Record<string, unknown>;

function findRouteFiles(dir: string, fileList: string[] = []): string[] {
	const files = fs.readdirSync(dir);

	for (const file of files) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			findRouteFiles(filePath, fileList);
		} else if (file === "routes.ts" || file === "routes.js") {
			fileList.push(filePath);
		}
	}

	return fileList;
}

function toFileUrl(filePath: string): string {
	if (process.platform === "win32") {
		return `file://${filePath.replace(/\\/g, "/")}`;
	}
	return filePath;
}

function getRegistration(mod: RouteModule) {
	return Object.values(mod).find((exp) => typeof exp === "function") as
		| ((app: FastifyInstance) => Promise<void>)
		| undefined;
}

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

	let modulesPath = path.join(process.cwd(), "src", "modules");
	if (!fs.existsSync(modulesPath)) {
		modulesPath = path.join(process.cwd(), "..", "modules");
	}

	const routeFiles = findRouteFiles(modulesPath);

	for (const file of routeFiles) {
		const mod: RouteModule = await import(toFileUrl(file));
		const registration = getRegistration(mod);
		if (!registration) continue;

		await app.register(
			async (moduleApp) => {
				await registration(moduleApp);
			},
			{ prefix: "/api" },
		);
	}

	app.addHook("onReady", () => logRegisteredRoutes(collected));
}
