"use client"
import { IDisher } from "@/interfaces";
import { useState } from "react";
import BaseTable from "@/components/table/base-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdminPageHeader } from "../../_components/admin-sections";
import { IconEdit } from "@tabler/icons-react";
import { disherList } from "@/lib/mock/disher";
import { disherColumns } from "../_components/dishers.columns";
import ComposeMessageDialog from "../_components/ComposeMessage.dialog";


export default function DishersPage() {

  const [data, setData] = useState<IDisher[]>(disherList);


  return (

    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col items-center justify-between gap-3 mb-7 md:flex-row">
        <AdminPageHeader title="All Users / Disher" />
        <ComposeMessageDialog>
          <Button className="flex items-center gap-1.5 font-bold">
            <IconEdit size={'1.1rem'} />
            Compose Message
          </Button>
        </ComposeMessageDialog>
      </div>
      <div className="flex flex-wrap w-full gap-6 mt-4 lg:flex-nowrap items center">
        <Input
          type="search"
          placeholder="Title"
          className="w-full h-full py-5"
        />
        <Select>
          <SelectTrigger className="py-5">
            <SelectValue placeholder="Taskers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Taskers</SelectItem>
          </SelectContent>
        </Select>
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

        <BaseTable data={data} columns={disherColumns} />
      </div>

    </div>

  );
}
