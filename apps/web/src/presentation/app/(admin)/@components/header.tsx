"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSignOut } from "@/modules/identity/authentication/hooks/use-sign-out";
import { Button } from "@/presentation/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/presentation/components/ui/navigation-menu";

export const Header: React.FC = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { handleSignOut, signOutIsPending } = useSignOut({
		navigate: (path) => router.push(path),
	});

	return (
		<header className="flex items-center justify-between border-b px-4 py-2">
			<NavigationMenu viewport={false}>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuLink asChild>
							<Link href="/">Portfolio</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink
							asChild
							data-active={pathname.startsWith("/~/admin/projects")}
						>
							<Link href="/~/admin/projects">Projects</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink
							asChild
							data-active={pathname.startsWith("/~/admin/experiences")}
						>
							<Link href="/~/admin/experiences">Experiences</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink
							asChild
							data-active={pathname === "/~/admin/hero"}
						>
							<Link href="/~/admin/hero">Hero</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			<Button
				variant="ghost"
				size="sm"
				className="hover:text-destructive"
				onClick={handleSignOut}
				disabled={signOutIsPending}
			>
				Sign out
			</Button>
		</header>
	);
};
