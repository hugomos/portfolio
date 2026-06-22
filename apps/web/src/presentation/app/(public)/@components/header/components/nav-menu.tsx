import type React from "react";
import { Link } from "react-router";
import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/presentation/components/ui/navigation-menu";

export interface NavItemProps {
	title: string;
	url?: string;
	icon?: React.ElementType;
	items?: Array<{ title: string; url: string; description?: string }>;
}

interface NavMenuProps {
	items: NavItemProps[];
}

export const NavMenu: React.FC<NavMenuProps> = ({ items }) => {
	return (
		<NavigationMenuList>
			{items.map((item) => {
				if (!item.items?.length && item.url) {
					return (
						<NavigationMenuItem key={item.title}>
							<NavigationMenuLink
								className={navigationMenuTriggerStyle()}
								asChild
							>
								<Link to={item.url}>{item.title}</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					);
				}

				return (
					<NavigationMenuItem key={item.title}>
						<NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-48 p-1">
								{item.items?.map((sub) => (
									<li key={sub.title}>
										<NavigationMenuLink
											asChild
											className="block select-none space-y-1 p-3 leading-none no-underline outline-none"
										>
											<Link to={sub.url}>
												<div className="font-medium text-sm leading-none">
													{sub.title}
												</div>
												{sub.description && (
													<p className="line-clamp-2 text-muted-foreground text-xs leading-snug">
														{sub.description}
													</p>
												)}
											</Link>
										</NavigationMenuLink>
									</li>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				);
			})}
		</NavigationMenuList>
	);
};
