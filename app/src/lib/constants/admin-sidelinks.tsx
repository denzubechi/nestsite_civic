import { Icons } from "@/components/icons";
import {
  IconUsersGroup,
  IconUserShield,
  IconHeadphones,
  IconDoorExit,
  IconMoneybag,
} from "@tabler/icons-react";
import {
  MegaphoneIcon,
  PodcastIcon,
  BriefcaseBusinessIcon,
  PieChartIcon,
  EuroIcon,
  HandCoinsIcon,
  StoreIcon,
  SettingsIcon,
} from "lucide-react";

import { ROUTE } from ".";

export interface NavLink {
  title: string;
  label?: string;
  variant?: "default" | "destructive";
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const AdminRoutes = {
  ClubTypes: "/admin/club-types",
};

export const sidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: ROUTE.DASHBOARD,
    icon: <Icons.dashboard size={18} />,
  },

  {
    title: "Analytics",
    label: "",
    href: ROUTE.ANALYTICS,
    icon: <PieChartIcon size={18} />,
  },
  {
    title: "Portfolio",
    label: "",
    href: "",
    icon: <BriefcaseBusinessIcon size={18} />,
    sub: [
      {
        title: "Preview",
        label: "",
        href: ROUTE.PORTFOLIO.INDEX,
        icon: <IconUserShield size={18} />,
      },

      {
        title: "projects",
        label: "",
        href: ROUTE.PORTFOLIO.PROJECTS,
        icon: <IconUserShield size={18} />,
      },
    ],
  },
  {
    title: "Storefront",
    label: "",
    href: "",
    icon: <StoreIcon size={18} />,
    sub: [
      {
        title: "Preview",
        label: "",
        href: ROUTE.STOREFRONT.INDEX,
        icon: <IconUserShield size={18} />,
      },

      {
        title: "Product-category",
        label: "",
        href: ROUTE.STOREFRONT.CATEGORY,
        icon: <IconUserShield size={18} />,
      },

      {
        title: "products",
        label: "",
        href: ROUTE.STOREFRONT.PRODUCTS,
        icon: <IconUserShield size={18} />,
      },
    ],
  },
  {
    title: "Payment Link",
    label: "",
    href: ROUTE.PAYMENT,
    icon: <EuroIcon size={18} />,
  },
  // {
  // 	title: "Withdrawals",
  // 	label: "",
  // 	href: ROUTE.WITHDRAWALS,
  // 	icon: <IconMoneybag size={18} />,
  // },
  // {
  // 	title: "Updates",
  // 	label: "",
  // 	href: ROUTE.UPDATES,
  // 	icon: <MegaphoneIcon size={18} />,
  // },
  {
    title: "Settings",
    label: "",
    href: "",
    icon: <SettingsIcon size={18} />,
    sub: [
      {
        title: "Profile",
        label: "",
        href: ROUTE.PROFILE,
        icon: <IconUserShield size={18} />,
      },
      // {
      // 	title: "Payout",
      // 	label: "",
      // 	href: ROUTE.PAYOUT,
      // 	icon: <HandCoinsIcon size={18} />,
      // },
      // {
      // 	title: "Login & Security",
      // 	label: "",
      // 	href: ROUTE.SECURITY,
      // 	icon: <IconUserShield size={18} />,
      // },
    ],
  },
  // {
  // 	title: "Users",
  // 	label: "",
  // 	href: "",
  // 	icon: <IconUsersGroup size={18} />,
  // 	sub: [
  // 		{
  // 			title: "All Users",
  // 			label: "",
  // 			href: "/users",
  // 			icon: <IconUserShield size={18} />,
  // 		},

  // 	],
  // },
  // {
  //   title: "Subscription",
  //   label: "",
  //   href: ROUTE.HASHED,
  //   icon: <PodcastIcon size={18} />,
  // },
];

export const bottomSidelinks: SideLink[] = [
  {
    title: "Support Tickets",
    label: "",
    href: ROUTE.HASHED,
    icon: <IconHeadphones size={18} />,
  },
  // {
  //   title: "Log Out",
  //   label: "",
  //   href: "/logout",

  //   icon: <IconDoorExit size={18} />,
  // },
];
