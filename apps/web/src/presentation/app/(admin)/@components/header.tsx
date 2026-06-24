import type React from "react";
import { Link, useLocation } from "react-router";
import { Button } from "@/presentation/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/presentation/components/ui/navigation-menu";

export const Header: React.FC = () => {
	const location = useLocation();

	return (
		<header className="flex items-center justify-between border-b px-4 py-2">
			<NavigationMenu viewport={false}>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuLink asChild>
							<Link to="/">Portfolio</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink
							asChild
							data-active={location.pathname.startsWith("/~/admin/projects")}
						>
							<Link to="/~/admin/projects">Projects</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink
							asChild
							data-active={location.pathname.startsWith("/~/admin/experiences")}
						>
							<Link to="/~/admin/experiences">Experiences</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink
							asChild
							data-active={location.pathname === "/~/admin/hero"}
						>
							<Link to="/~/admin/hero">Hero</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			<Button variant="ghost" size="sm" className="hover:text-destructive">
				Sign out
			</Button>
		</header>
	);
};
