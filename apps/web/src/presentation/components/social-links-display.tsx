import {
	GithubLogo,
	InstagramLogo,
	LinkedinLogo,
	TiktokLogo,
	XLogo,
	YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import type React from "react";
import type { SocialLinkDTO, SocialPlatform } from "@/modules/portfolio/project/dto";

const platformConfig: Record<
	SocialPlatform,
	{ icon: React.ElementType; buildUrl: (username: string) => string }
> = {
	instagram: {
		icon: InstagramLogo,
		buildUrl: (u) => `https://instagram.com/${u}`,
	},
	x: {
		icon: XLogo,
		buildUrl: (u) => `https://x.com/${u}`,
	},
	linkedin: {
		icon: LinkedinLogo,
		buildUrl: (u) => `https://linkedin.com/in/${u}`,
	},
	github: {
		icon: GithubLogo,
		buildUrl: (u) => `https://github.com/${u}`,
	},
	youtube: {
		icon: YoutubeLogo,
		buildUrl: (u) => `https://youtube.com/@${u}`,
	},
	tiktok: {
		icon: TiktokLogo,
		buildUrl: (u) => `https://tiktok.com/@${u}`,
	},
};

interface SocialLinksDisplayProps {
	socialLinks: SocialLinkDTO[];
}

export const SocialLinksDisplay: React.FC<SocialLinksDisplayProps> = ({
	socialLinks,
}) => {
	if (!socialLinks.length) return null;

	const sorted = [...socialLinks].sort((a, b) => a.sortOrder - b.sortOrder);

	return (
		<div className="flex flex-wrap gap-3">
			{sorted.map((link) => {
				const config = platformConfig[link.platform];
				if (!config) return null;
				const Icon = config.icon;
				return (
					<a
						key={`${link.platform}-${link.username}`}
						href={config.buildUrl(link.username)}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
					>
						<Icon className="size-4" />
						<span>@{link.username}</span>
					</a>
				);
			})}
		</div>
	);
};
