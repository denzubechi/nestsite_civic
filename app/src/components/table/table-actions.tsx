"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { EditIcon, Eye, EyeOff, EllipsisVertical, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";


export default function Actions<T,>({
    isHidden,
    hideFunction,
    editFunction,
    viewFunction,
    editButton,
    deleteFunction,
}: {
    isHidden?: boolean;
    hideFunction?: () => Promise<void>;
    editButton?: ReactNode;
    viewFunction?: () => Promise<void>;
    editFunction?: () => Promise<void>;
    deleteFunction?: () => Promise<void>;
}) {
    const router = useRouter();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full">

                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="" align="center" forceMount>
                <DropdownMenuItem onClick={() => viewFunction && viewFunction()} className="flex gap-2 p-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600/20">
                        <Eye size={17} className="text-green-600" />
                    </div>

                    <p>View</p>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => editFunction && editFunction()} className="flex gap-2 p-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent">
                        <EditIcon size={17} className="text-primary" />
                    </div>
                    <p>Edit</p>

                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => deleteFunction && deleteFunction()} className="flex gap-2 p-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-destructive/20">
                        <Trash size={17} className="text-destructive" />
                    </div>
                    <p>Delete</p>

                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu >
    );
}
