"use client";
import { toast } from "@/components/ui/use-toast";
import { ITasker, ITaskerTitle } from "@/interfaces";
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
import { Button } from "@/components/ui/button";

const taskerTitleColumnHelper = createColumnHelper<ITaskerTitle>();

export const taskerTitleColumns = [
  taskerTitleColumnHelper.accessor("id", {
    header: ({ column }) => <Header title="" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <div>
        <Checkbox className="w-5 h-5" />
      </div>
    ),
    // footer: (info) => info.column.id,
  }),
  taskerTitleColumnHelper.accessor("title", {
    header: ({ column }) => <Header title="Tasker Title" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>
    ),
    // footer: (info) => info.column.id,
  }),

  taskerTitleColumnHelper.accessor("specialties", {
    header: ({ column }) => (
      <Header title="Tasker Specialties" column={column} />
    ),

    sortingFn: "text",
    cell: (info) => (
      <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>
    ),
  }),

  taskerTitleColumnHelper.accessor("createdAt", {
    header: ({ column }) => <Header title="Date Created" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>
    ),
  }),

  taskerTitleColumnHelper.accessor("status", {
    header: ({ column }) => <Header title="Status" column={column} />,

    sortingFn: "text",
    cell: (info) => {
      const val = info.getValue()?.toString() as StatusType;
      return <Status value={val} />;
    },
    // footer: (info) => info.column.id,
  }),

  taskerTitleColumnHelper.accessor("id", {
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
            // router.push(`/admin/bookings/${info?.row?.original?.id}`);
            console.log("edit");
          }}
          deleteFunction={async () => {
            toast({
              description: "Tasker Tile deleted!",
            });
          }}
          editButton={
            <>
              <Button>Edit</Button>
            </>
          }
        />
      );
    },
    header: ({ column }) => (
      <Header title="Actions" column={column} className="justify-center" />
    ),

    // footer: (info) => info.column.id,
  }),
];
