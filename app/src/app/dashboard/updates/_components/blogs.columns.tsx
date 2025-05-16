"use client";
import { toast } from "@/components/ui/use-toast";
import { IBlog } from "@/interfaces";
import { createColumnHelper } from "@tanstack/react-table";
import GirlImg from "@/assets/frame.png";
import Image from "next/image";
import { StatusType } from "@/lib/constants";
import Status from "@/app/dashboard/_components/Status";
import { Input } from "@/components/ui/input";
import Header from "@/components/table/table-header-item";
import Actions from "@/components/table/table-actions";
import BlogStatus from "./Status";
import { Checkbox } from "@/components/ui/checkbox";

const blogColumnHelper = createColumnHelper<IBlog>();

export const blogColumns = [
  blogColumnHelper.accessor("id", {
    header: ({ column }) => <Header title="" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <div>
        <Checkbox className="w-5 h-5" />
      </div>
    ),
    // footer: (info) => info.column.id,
  }),

  blogColumnHelper.accessor("title", {
    header: ({ column }) => <Header title="Blog Title" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <Image
          src={info.row.original?.featuredImage?.toString() || GirlImg}
          alt="profile"
          className="w-9 h-9"
        />
        <span className=" capitalize whitespace-nowrap">
          {info.getValue()?.toString()}
        </span>
      </div>
    ),
    // footer: (info) => info.column.id,
  }),
  blogColumnHelper.accessor("category", {
    header: ({ column }) => <Header title="Category" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="capitalize whitespace-nowrap">
        {info.getValue()?.toString()}
      </span>
    ),
    // footer: (info) => info.column.id,
  }),
  blogColumnHelper.accessor("createdAt", {
    header: ({ column }) => <Header title="Date" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="capitalize whitespace-nowrap">
        {info.getValue()?.toString()}
      </span>
    ),
    // footer: (info) => info.column.id,
  }),

  blogColumnHelper.accessor("status", {
    header: ({ column }) => <Header title="Status" column={column} />,

    sortingFn: "text",
    cell: (info) => {
      const val = info.getValue()?.toString() as "PUBLISHED" | "DRAFT";
      return <BlogStatus value={val} />;
    },
    // footer: (info) => info.column.id,
  }),

  blogColumnHelper.accessor("id", {
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
