import path from "path";
import type { NextConfig } from "next";

const config: NextConfig = {
	webpack(webpackConfig) {
		const nm = path.resolve(__dirname, "node_modules");
		webpackConfig.resolve.alias = {
			...webpackConfig.resolve.alias,
			"tw-animate-css": path.join(nm, "tw-animate-css/dist/tw-animate.css"),
			"shadcn/tailwind.css": path.join(nm, "shadcn/dist/tailwind.css"),
		};
		return webpackConfig;
	},
};

export default config;
