"use client";
import { toast } from "@/components/ui/use-toast";
import { IVerificationRequest } from "@/interfaces";
import { createColumnHelper } from "@tanstack/react-table";
import Header from "../table-header-item";
import Actions from "../table-actions";
import GirlImg from "@/assets/frame.png";
import CountryImg from "@/assets/usa.png";
import Image from "next/image";
import { StatusType } from "@/lib/constants";
import Status from "@/app/dashboard/_components/Status";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const verificationRequestColumnHelper =
  createColumnHelper<IVerificationRequest>();

export const verificationRequestColumns = [
  verificationRequestColumnHelper.accessor("id", {
    header: ({ column }) => <Header title="" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <div>
        <Checkbox className="w-5 h-5" />
      </div>
    ),
    // footer: (info) => info.column.id,
  }),
  verificationRequestColumnHelper.accessor("customer", {
    header: ({ column }) => <Header title="Name" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <Image
          src={info.getValue()?.profilePhoto?.toString() || GirlImg}
          alt="profile"
          className="rounded-full w-9 h-9"
        />
        <span className="capitalize whitespace-nowrap">
          {info.getValue()?.biodata?.firstName?.toString()}{" "}
          {info.getValue()?.biodata?.lastName?.toString()}
        </span>
      </div>
    ),
    // footer: (info) => info.column.id,
  }),

  verificationRequestColumnHelper.accessor("customer", {
    header: ({ column }) => <Header title="Phone" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="capitalize whitespace-nowrap">
        {info.getValue()?.phoneNumber?.toString()}
      </span>
    ),
  }),

  verificationRequestColumnHelper.accessor("customer", {
    header: ({ column }) => <Header title="Email" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="capitalize whitespace-nowrap">
        {info.getValue()?.email?.toString()}
      </span>
    ),
  }),

  verificationRequestColumnHelper.accessor("reference", {
    header: ({ column }) => <Header title="References" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="capitalize whitespace-nowrap">
        {info.getValue()?.toString()}
      </span>
    ),
    // footer: (info) => info.column.id,
  }),

  verificationRequestColumnHelper.accessor("customer", {
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

  verificationRequestColumnHelper.accessor("createdAt", {
    header: ({ column }) => <Header title="Date Created" column={column} />,

    sortingFn: "text",
    cell: (info) => (
      <span className="capitalize whitespace-nowrap">
        {info.getValue()?.toString()}
      </span>
    ),
    // footer: (info) => info.column.id,
  }),

  verificationRequestColumnHelper.accessor("status", {
    header: ({ column }) => <Header title="Status" column={column} />,

    sortingFn: "text",
    cell: (info) => {
      const val = info.getValue()?.toString() as StatusType;
      return <Status value={val} />;
    },
    // footer: (info) => info.column.id,
  }),

  verificationRequestColumnHelper.accessor("id", {
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
