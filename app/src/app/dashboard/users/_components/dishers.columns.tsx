"use client";
import { toast } from "@/components/ui/use-toast";
import { IDisher } from "@/interfaces";
import { createColumnHelper } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import Header from "@/components/table/table-header-item";
import Actions from "@/components/table/table-actions";
import Status from "../../_components/Status";
import { StatusType } from "@/lib/constants";
import { Checkbox } from "@/components/ui/checkbox";

const disherColumnHelper = createColumnHelper<IDisher>();

export const disherColumns = [
    disherColumnHelper.accessor("id", {
        header: ({ column }) => <Header title="" column={column} />,

        sortingFn: "text",
        cell: (info) => <div>
            <Checkbox className="w-5 h-5" />
            
        </div>,
        // footer: (info) => info.column.id,
    }),
    disherColumnHelper.accessor("title", {
        header: ({ column }) => <Header title="Title" column={column} />,

        sortingFn: "text",
        cell: (info) => (
            <span className="capitalize whitespace-nowrap">
                {info.getValue()?.toString()}
            </span>
        ),
        // footer: (info) => info.column.id,
    }),
    disherColumnHelper.accessor('message', {
        header: ({ column }) => <Header title="Message" column={column} />,

        sortingFn: "text",
        cell: (info) => (
            <span className="capitalize whitespace-nowrap">
                {info.getValue()?.toString()}
            </span>
        ),
        // footer: (info) => info.column.id,
    }),
    disherColumnHelper.accessor("method", {
        header: ({ column }) => <Header title="Method" column={column} />,

        sortingFn: "text",
        cell: (info) => (
            <span className="capitalize whitespace-nowrap">
                {info.getValue()?.toString()}
            </span>
        ),
        // footer: (info) => info.column.id,
    }),
    disherColumnHelper.accessor("schedule", {
        header: ({ column }) => <Header title="Schedule" column={column} />,

        sortingFn: "text",
        cell: (info) => (
            <span className="capitalize whitespace-nowrap">
                {info.getValue()?.toString()}
            </span>
        ),
        // footer: (info) => info.column.id,
    }),
    disherColumnHelper.accessor("status", {
        header: ({ column }) => <Header title="Status" column={column} />,

        sortingFn: "text",
        cell: (info) => {
            const val = info.getValue()?.toString() as StatusType;
            return <Status value={val} />
        },
        // footer: (info) => info.column.id,
    }),
    disherColumnHelper.accessor("id", {
        sortingFn: "text",
        cell: (info) => {
            const router = { push: (url: string) => window.location.href = url };
            return (
                <Actions
                    isHidden={!!info.getValue()}
                    hideFunction={async () => {
                        // await hidebooking(info?.row?.original?._id ?? "", !info.getValue());
                        toast({
                            description: `booking ${!info.getValue() ? "Hidden" : "Shown"}!`,
                        });
                    }}
                    editFunction={async () => {
                        router.push(`/admin/bookings/${info?.row?.original?.id}`);
                    }}
                    deleteFunction={async () => {
                        toast({
                            description: "booking deleted!",
                        });
                    }}
                />
            );
        },
        header: ({ column }) => <Header title="Actions" column={column} className="justify-center" />,

        // footer: (info) => info.column.id,
    }),
];
