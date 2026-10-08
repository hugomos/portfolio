import type { NextConfig } from "next";

const config: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "pub-9fdde3f107344fa1969daefc7006ef1b.r2.dev",
			},
		],
	},
};

export default config;
