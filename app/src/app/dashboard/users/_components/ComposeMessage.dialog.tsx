"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { TextArea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function ComposeMessageDialog({
	children,
	onSuccess = () => { },
}: {
	children: ReactNode;
	onSuccess?: () => void;
}) {
	const [open, setOpen] = useState<boolean>(false);
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [title, setTitle] = useState("");


	const handleChangeName = (value: string) => {
		setTitle(value);
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// setIsLoading(true);

		setIsLoading(false);
		router.refresh();
		setOpen(false);

	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[525px] max-h-[90dvh] overflow-auto text-gray-800">
				<DialogHeader>
					<DialogTitle>Compose Message</DialogTitle>
				</DialogHeader>
				<form onSubmit={onSubmit} className="grid gap-6 py-4 gap-x-5 text-[#424242] mt-5">
                    <div className="grid gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="firstname" className="">
                                Title*
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder=""
                                className=""
                                value={title}
                                onChange={(e) => handleChangeName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="lastname" className="">
                                Body*
                            </Label>
                            <TextArea
                                id="body"
                                name="body"
                                placeholder=""
                                className=""
                                value={title}
                                onChange={(e) => handleChangeName(e.target.value)}
                                rows={4}
                            />
                        </div>
                        <div className="flex flex-col gap-6 md:flex-row w-full">
                            <div className="flex flex-col gap-2 w-full">
                                <Label htmlFor="firstname" className="">
                                    Schedule
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder=""
                                    className=" w-full"
                                    value={title}
                                    onChange={(e) => handleChangeName(e.target.value)}
                                    type="date"
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <Label htmlFor="firstname" className="">
                                    Time
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder=""
                                    className=" w-full"
                                    value={title}
                                    onChange={(e) => handleChangeName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="firstname" className="">
                                Methods*
                            </Label>
                            <div className="flex gap-3 flex-wrap text-sm">
                                <label htmlFor="push" className="flex items-center gap-2 rounded-md px-4 p-2 border cursor-pointer">
                                  
                                    <Checkbox id="push" className="h-auto"/>
                                    Push
                                </label>
                                <label htmlFor="inbox" className="flex items-center gap-2 rounded-md px-4 p-2 border cursor-pointer">
                            
                                    <Checkbox id="inbox" className="h-auto"/>

                                    Inbox
                                </label>
                                <label htmlFor="email" className="flex items-center gap-2 rounded-md px-4 p-2 border cursor-pointer">
                           
<Checkbox id="email" className="h-auto"/>

                                    Email
                                </label>
                            </div>
                        </div>
                    </div>
					<DialogFooter className="flex items-center justify-center sm:justify-center">
						<Button
							// disabled={
							// 	title.trim().length === 0 ||
							// 	isLoading
							// }
                            className="text-xs font-semibold w-full"
							type="submit"
						>
							{isLoading
								? "Dish..."
								: "Dish"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
