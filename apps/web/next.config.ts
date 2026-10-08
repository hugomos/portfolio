import type { NextConfig } from "next";

const config: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "SEU_DOMINIO_R2",
			},
		],
	},
};

export default config;
