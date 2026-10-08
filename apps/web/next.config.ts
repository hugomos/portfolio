import type { NextConfig } from "next";

const config: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cb86e141f7f44fcb0c7af8e300fd364a.r2.cloudflarestorage.com",
			},
		],
	},
};

export default config;
