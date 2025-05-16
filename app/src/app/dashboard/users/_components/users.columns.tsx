"use client";
import { toast } from "@/components/ui/use-toast";
import { IUser } from "@/interfaces";
import { createColumnHelper } from "@tanstack/react-table";
import GirlImg from "@/assets/frame.png"
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Header from "@/components/table/table-header-item";
import Actions from "@/components/table/table-actions";
import CountryImg from "@/assets/usa.png"
import Status from "../../_components/Status";
import { StatusType } from "@/lib/constants";
import { Checkbox } from "@/components/ui/checkbox";

const userColumnHelper = createColumnHelper<IUser>();

export const userColumns = [
    userColumnHelper.accessor("id", {
        header: ({ column }) => <Header title="" column={column} />,

        sortingFn: "text",
        cell: (info) => <div>
            <Checkbox className="w-5 h-5" />

        </div>,
        // footer: (info) => info.column.id,
    }),
    userColumnHelper.accessor("name", {
        header: ({ column }) => <Header title="Name" column={column} />,

        sortingFn: "text",
        cell: (info) => (
            <div className="flex items-center gap-2">
                <Image src={GirlImg} alt='profile' className="w-9 h-9" />
                <span className="capitalize whitespace-nowrap">
                    {info.getValue()?.toString()}
                </span>
            </div>
        ),
        // footer: (info) => info.column.id,
    }),
    userColumnHelper.accessor("phone", {
        header: ({ column }) => <Header title="Phone" column={column} />,

        sortingFn: "text",
        cell: (info) => (
            <span className="capitalize whitespace-nowrap">
                {info.getValue()?.toString()}
            </span>
        ),
        // footer: (info) => info.column.id,
    }),
    userColumnHelper.accessor("email", {
        header: ({ column }) => <Header title="Email" column={column} />,

        sortingFn: "text",
        cell: (info) => (
            <span className="capitalize whitespace-nowrap">
                {info.getValue()?.toString()}
            </span>
        ),
        // footer: (info) => info.column.id,
    }),
    userColumnHelper.accessor('role', {
        header: ({ column }) => <Header title="Role" column={column} />,

        sortingFn: "text",
        cell: (info) => (
            <span className="capitalize whitespace-nowrap">
                {info.getValue()?.toString()}
            </span>
        ),
        // footer: (info) => info.column.id,
    }),
    userColumnHelper.accessor('profilePhoto', {
        header: ({ column }) => <Header title="Country" column={column} />,

        sortingFn: "text",
        cell: (info) => (
            <div className="flex items-center gap-2">
                <Image src={info.getValue() || CountryImg} alt='profile' className="rounded-full w-9 h-9" />
                <span className="capitalize whitespace-nowrap">
                    {info.row.original.country}
                </span>
            </div>
        ),
        // footer: (info) => info.column.id,
    }),
    userColumnHelper.accessor("createdAt", {
        header: ({ column }) => <Header title="Date Joined" column={column} />,

        sortingFn: "text",
        cell: (info) => (
            <span className="capitalize whitespace-nowrap">
                {info.getValue()?.toString()}
            </span>
        ),
        // footer: (info) => info.column.id,
    }),
    userColumnHelper.accessor("status", {
        header: ({ column }) => <Header title="Status" column={column} />,

        sortingFn: "text",
        cell: (info) => {
            const val = info.getValue()?.toString() as StatusType;
            return <Status value={val} />
        },
        // footer: (info) => info.column.id,
    }),
    userColumnHelper.accessor("id", {
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
