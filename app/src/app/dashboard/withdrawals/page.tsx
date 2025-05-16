"use client"
import { IWithdrawal } from "@/interfaces";
import { useState } from "react";
import { AdminPageHeader } from "../_components/admin-sections";
import BaseTable from "@/components/table/base-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { withdrawalList } from "@/lib/mock/withdrawals";
import { withdrawalColumns } from "./_components/withdrawals.columns";


export default function Withdrawalage() {

  const [data, setData] = useState<IWithdrawal[]>(withdrawalList);


  return (

    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">
      <AdminPageHeader title="Withdraw requests" className="mb-6" />
      <div className="grid flex-wrap items-center gap-3 p-4 mb-2 font-medium text-center bg-white rounded-md lg:text-left xl:flex lg:grid-cols-2 xl:justify-between">
        <div className="text-sm">Total Paid £547400</div>
        <span className="hidden xl:inline-block">|</span>
        <div className="text-sm">Total Pending 20</div>
        <span className="hidden xl:inline-block">|</span>
        <div className="text-sm">Total Rejected 220</div>
        <span className="hidden xl:inline-block">|</span>
        <div className="text-sm">Total Country 20</div>
        <span className="hidden xl:inline-block">|</span>
        <div className="text-sm">Total User 10540</div>
      </div>
      <div className="flex flex-wrap w-full gap-6 mt-4 lg:flex-nowrap items center">
        <Input
          type="search"
          placeholder="Name"
          className="w-full h-full py-5"
        />
        <Input
          type="search"
          placeholder="Withdrawal Reference"
          className="w-full h-full py-5"
        />
        <Select>
          <SelectTrigger className="py-5">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">All</SelectItem>
          </SelectContent>
        </Select>
        <Button className="flex items-center w-full h-full gap-3 py-5">
          <Search size={'1.1rem'} />
          Search
        </Button>
      </div>
      <div className="flex flex-col mt-6 leading-[140%] max-md:max-w-full">
        <BaseTable data={data} columns={withdrawalColumns} />
      </div>

    </div>

  );
}
