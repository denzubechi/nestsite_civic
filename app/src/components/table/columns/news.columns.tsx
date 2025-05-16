"use client";
import { toast } from "@/components/ui/use-toast";
import { INews } from "@/interfaces";
import { Column, createColumnHelper } from "@tanstack/react-table";
import Header from "../table-header-item";
import Actions from "../table-actions";
import GirlImg from "@/assets/frame.png";
import CountryImg from "@/assets/usa.png";
import Image from "next/image";
import { StatusType } from "@/lib/constants";
import { Star } from "lucide-react";
import Status from "@/app/dashboard/_components/Status";
import { Input } from "@/components/ui/input";
import { IconStarFilled } from "@tabler/icons-react";
import { Checkbox } from "@/components/ui/checkbox";

const newsColumnHelper = createColumnHelper<INews>();

export const newsColumns = [
  newsColumnHelper.accessor("id", {
    header: ({ column }) => <Header title="" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <div>
        <Checkbox className="w-5 h-5" />
      </div>
    ),
    // footer: (info) => info.column.id,
  }),
  newsColumnHelper.accessor("title", {
    header: ({ column }) => <Header title="Blog Title" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <Image
          src={info.row.original?.coverImage?.toString() || GirlImg}
          alt="profile"
          className=" w-9 h-9"
        />
        <div className="flex flex-col">
          <span className="capitalize whitespace-nowrap">
            {info.getValue()?.toString()}
          </span>
        </div>
      </div>
    ),
    // footer: (info) => info.column.id,
  }),

  newsColumnHelper.accessor("category", {
    header: ({ column }) => <Header title="Category" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="capitalize whitespace-nowrap">
        {info.getValue()?.toString()}
      </span>
    ),
  }),

  newsColumnHelper.accessor("createdAt", {
    header: ({ column }) => <Header title="Date" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="capitalize whitespace-nowrap">
        {info.getValue()?.toString()}
      </span>
    ),
  }),

  newsColumnHelper.accessor("status", {
    header: ({ column }) => <Header title="Status" column={column} />,

    sortingFn: "text",
    cell: (info) => {
      const val = info.getValue()?.toString() as StatusType;
      return <Status value={val} />;
    },
    // footer: (info) => info.column.id,
  }),

  newsColumnHelper.accessor("id", {
    sortingFn: "text",
    cell: (info) => {
      const router = { push: (url: string) => (window.location.href = url) };
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
    header: ({ column }) => (
      <Header title="Actions" column={column} className="justify-center" />
    ),

    // footer: (info) => info.column.id,
  }),
];
