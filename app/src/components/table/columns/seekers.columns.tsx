"use client";
import { toast } from "@/components/ui/use-toast";
import { ISeeker } from "@/interfaces";
import { Column, createColumnHelper } from "@tanstack/react-table";
import Header from "../table-header-item";
import Actions from "../table-actions";
import GirlImg from "@/assets/frame.png";
import CountryImg from "@/assets/usa.png";
import Image from "next/image";
import { ROUTE, StatusType } from "@/lib/constants";
import { Star } from "lucide-react";
import Status from "@/app/dashboard/_components/Status";
import { Input } from "@/components/ui/input";
import { IconStarFilled } from "@tabler/icons-react";
import { Checkbox } from "@/components/ui/checkbox";

const seekerColumnHelper = createColumnHelper<ISeeker>();

export const seekerColumns = [
  seekerColumnHelper.accessor("id", {
    header: ({ column }) => <Header title="" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <div>
        <Checkbox className="w-5 h-5" />
      </div>
    ),
    // footer: (info) => info.column.id,
  }),
  seekerColumnHelper.accessor("customer", {
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

  seekerColumnHelper.accessor("customer", {
    header: ({ column }) => <Header title="Phone" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="capitalize whitespace-nowrap">
        {info.getValue()?.phoneNumber?.toString()}
      </span>
    ),
  }),

  seekerColumnHelper.accessor("customer", {
    header: ({ column }) => <Header title="Email" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="capitalize whitespace-nowrap">
        {info.getValue()?.email?.toString()}
      </span>
    ),
  }),

  seekerColumnHelper.accessor("customer", {
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

  seekerColumnHelper.accessor("bookings", {
    header: ({ column }) => <Header title="Bookings" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="capitalize whitespace-nowrap">
        {info.getValue()?.toString()}
      </span>
    ),
    // footer: (info) => info.column.id,
  }),

  seekerColumnHelper.accessor("rating", {
    header: ({ column }) => <Header title="Ratings" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="flex items-center gap-1 capitalize whitespace-nowrap">
        <IconStarFilled color="#FFD300" className="rounded-full" />
        {info.getValue()?.toString()}
      </span>
    ),
    // footer: (info) => info.column.id,
  }),

  seekerColumnHelper.accessor("status", {
    header: ({ column }) => <Header title="Status" column={column} />,

    sortingFn: "text",
    cell: (info) => {
      const val = info.getValue()?.toString() as StatusType;
      return <Status value={val} />;
    },
    // footer: (info) => info.column.id,
  }),

  seekerColumnHelper.accessor("id", {
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
