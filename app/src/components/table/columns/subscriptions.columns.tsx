"use client";
import { toast } from "@/components/ui/use-toast";
import { ISubscription } from "@/interfaces";
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

const subscriptionColumnHelper = createColumnHelper<ISubscription>();

export const subscriptionColumns = [
  subscriptionColumnHelper.accessor("customer", {
    header: ({ column }) => <Header title="Name" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <Image
          src={info.getValue()?.profilePhoto?.toString() || GirlImg}
          alt="profile"
          className="rounded-full w-9 h-9"
        />
        <div className="flex flex-col">
          <span className="capitalize whitespace-nowrap">
            {info.getValue()?.biodata?.firstName?.toString()}{" "}
            {info.getValue()?.biodata?.lastName?.toString()}
          </span>
          <span className="text-xs">
            {info.getValue()?.biodata?.otherDetails?.profession?.toString()}
          </span>
        </div>
      </div>
    ),
    // footer: (info) => info.column.id,
  }),

  subscriptionColumnHelper.accessor("plan", {
    header: ({ column }) => <Header title="Plan" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="capitalize whitespace-nowrap">
        {info.getValue()?.type?.toString()}
      </span>
    ),
  }),

  subscriptionColumnHelper.accessor("customer", {
    header: ({ column }) => <Header title="Country" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <Image
          src={info.getValue()?.profilePhoto?.toString() || CountryImg}
          alt="profile"
          className="rounded-full w-9 h-9"
        />
        <span className="capitalize whitespace-nowrap">
          {info.getValue()?.biodata?.country?.toString()}
        </span>
      </div>
    ),
    // footer: (info) => info.column.id,
  }),

  subscriptionColumnHelper.accessor("plan", {
    header: ({ column }) => <Header title="Plan Duration" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="capitalize whitespace-nowrap">
        {info.getValue()?.duration?.toString()}
      </span>
    ),
  }),
  subscriptionColumnHelper.accessor("plan.startAt", {
    header: ({ column }) => <Header title="Start Date" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="capitalize whitespace-nowrap">
        {info.getValue()?.toString()}
      </span>
    ),
  }),
  subscriptionColumnHelper.accessor("plan.endAt", {
    header: ({ column }) => <Header title="End Date" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="capitalize whitespace-nowrap">
        {info.getValue()?.toString()}
      </span>
    ),
  }),
  subscriptionColumnHelper.accessor("plan", {
    header: ({ column }) => <Header title="Amount" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="capitalize whitespace-nowrap">
        ${info.getValue()?.amount?.toString()}
      </span>
    ),
  }),
  subscriptionColumnHelper.accessor("status", {
    header: ({ column }) => <Header title="Status" column={column} />,

    sortingFn: "text",
    cell: (info) => {
      const val = info.getValue()?.toString() as StatusType;
      return <Status value={val} />;
    },
    // footer: (info) => info.column.id,
  }),
];
