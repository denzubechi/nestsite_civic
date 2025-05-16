"use client";
import { Input } from "@/components/ui/input";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";

import * as React from "react";
import {
	Calculator,
	Calendar,
	CreditCard,
	Settings,
	Smile,
	User,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Search({ className }: { className?: string }) {
	const [open, setOpen] = React.useState(false);

	return (
		<div className={cn("", className)}>
			<Input
				type="search"
				placeholder="Search for anything ..."
				className="w-full bg-gray-100 border-transparent"
			// onFocus={() => setOpen(true)}
			/>
			<SearchCommandDialog open={open} setOpen={setOpen} />
		</div>
	);
}

export function SearchCommandDialog({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem asChild>
							<Link href={"/admin/clubs"}>
								<Calendar className="mr-2 h-4 w-4" />
								<span>Clubs</span>
							</Link>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						<CommandItem>
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<CreditCard className="mr-2 h-4 w-4" />
							<span>Billing</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Settings className="mr-2 h-4 w-4" />
							<span>Settings</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
}
