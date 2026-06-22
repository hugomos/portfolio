import type React from "react";
import { NavigationMenu } from "@/presentation/components/ui/navigation-menu";
import { type NavItemProps, NavMenu } from "./components/nav-menu";

const items: NavItemProps[] = [
	{ title: "Home", url: "/" },
	{ title: "Works", url: "/works" },
	{ title: "Experience", url: "/experience" },
];

export const Header: React.FC = () => {
	return (
		<header>
			<NavigationMenu className="-ml-4.5">
				<NavMenu items={items} />
			</NavigationMenu>
		</header>
	);
};
