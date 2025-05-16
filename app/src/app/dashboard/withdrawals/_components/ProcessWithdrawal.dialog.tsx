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

export default function ProcessWithdrawalDialog({
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
					<DialogTitle>Process Withdrawal with reference :  ghsy782982</DialogTitle>
				</DialogHeader>
				<form onSubmit={onSubmit} className="grid gap-4 py-4 gap-x-5">
                    <div className="grid gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="firstname" className="">
                                User&apos;s name
                            </Label>
                            <Input
                                id="firstname"
                                name="firstname"
                                placeholder="Laura James"
                                className=""
                                value={title}
                                onChange={(e) => handleChangeName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="lastname" className="">
                                Amount
                            </Label>
                            <Input
                                id="lastname"
                                name="lastname"
                                placeholder="$47"
                                className=""
                                value={title}
                                onChange={(e) => handleChangeName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title" className="">
                                Note
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
                            <Label htmlFor="email" className="">
                                Schedule Payment
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder=""
                                className=""
                                value={title}
                                onChange={(e) => handleChangeName(e.target.value)}
                                type="date"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title" className="">
                                Enter Processer OTP
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
                    </div>
					<DialogFooter className="flex items-center justify-center sm:justify-center">
						<Button
							// disabled={
							// 	title.trim().length === 0 ||
							// 	isLoading
							// }
                            className="text-xs font-semibold w-full max-w-[250px]"
							type="submit"
						>
							{isLoading
								? "Submiting..."
								: "Submit"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
