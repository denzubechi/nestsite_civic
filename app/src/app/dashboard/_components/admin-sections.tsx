import { cn } from "@/lib/utils";
import { LayoutHeader } from "./layout";
import { Search } from "./search";

import React, { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { UserNav } from "./user-nav";

const AdminPageNav = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<LayoutHeader
		ref={ref}
		className={cn("p-0 md:px-0", className)}
		{...props}
	>
		<div className="flex flex-col justify-between w-full gap-4 p-6 bg-white md:flex-row md:items-center">
			<Search className="flex-1" />
			<div className="flex items-center justify-end space-x-4">

				<UserNav />
			</div>
		</div>
	</LayoutHeader>
));
AdminPageNav.displayName = "AdminPageNav";

type AdminPageHeaderType = {
	title: string;
	prefix?: string;
	description?: string;
	button?: string;
	leftElem?: ReactNode;
};
const AdminPageHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & AdminPageHeaderType
>(({ className, title, prefix = "Dashboard", description, children, leftElem, ...props }, ref) => (
	<div
		className={cn(
			"flex gap-4 flex-col sm:flex-row sm:items-center justify-between",
			className,
		)}
		ref={ref}
		{...props}
	>
		<div className="flex items-center gap-4">
			{leftElem}
			<div>
				<h1 className="text-2xl font-medium leading-10 md:text-3xl lg:text-4xl text-neutral-700 max-md:max-w-full">{prefix} / <span className="font-light">{title}</span></h1>
				<p className="text-muted-foreground">{description}</p>
			</div>
		</div>
		{children}
	</div>
));
AdminPageHeader.displayName = "AdminPageHeader";

const AdminPageHeaderSkeleton = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
	<div className="flex justify-between w-full space-y-6">
		<div className="flex w-full flex-col space-y-0.5">
			<Skeleton className="w-1/2 h-4 rounded " />
			<Skeleton className="w-1/2 h-4 rounded " />
		</div>
		<div />
	</div>
));

AdminPageHeaderSkeleton.displayName = "AdminPageHeaderSkeleton";

export { AdminPageNav, AdminPageHeader, AdminPageHeaderSkeleton };
