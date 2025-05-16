"use client";
import { toast } from "@/components/ui/use-toast";
import { IVehicle } from "@/interfaces";
import { Column, createColumnHelper } from "@tanstack/react-table";
import Header from "../table-header-item";
import Actions from "../table-actions";
import GirlImg from "@/assets/frame.png";
import CountryImg from "@/assets/usa.png";
import Image from "next/image";
import { StatusType } from "@/lib/constants";
import Status from "@/app/dashboard/_components/Status";
import { Input } from "@/components/ui/input";
import { IconStarFilled } from "@tabler/icons-react";
import { Checkbox } from "@/components/ui/checkbox";

const vehicleColumnHelper = createColumnHelper<IVehicle>();

export const vehicleColumns = [
  vehicleColumnHelper.accessor("id", {
    header: ({ column }) => <Header title="" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <div>
        <Checkbox className="w-5 h-5" />
      </div>
    ),
    // footer: (info) => info.column.id,
  }),
  vehicleColumnHelper.accessor("vehicle", {
    header: ({ column }) => <Header title="Vehicle" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="whitespace-nowrap capitalize">
        {info.getValue()?.toString()}
      </span>
    ),
    // footer: (info) => info.column.id,
  }),

  vehicleColumnHelper.accessor("createdAt", {
    header: ({ column }) => <Header title="Date Created" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>
    ),
  }),

  vehicleColumnHelper.accessor("status", {
    header: ({ column }) => <Header title="Status" column={column} />,

    sortingFn: "text",
    cell: (info) => {
      const val = info.getValue()?.toString() as StatusType;
      return <Status value={val} />;
    },
    // footer: (info) => info.column.id,
  }),

  vehicleColumnHelper.accessor("id", {
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
