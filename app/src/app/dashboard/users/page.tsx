"use client"
import { IUser } from "@/interfaces";
import { useState } from "react";
import { AdminPageHeader } from "../_components/admin-sections";
import BaseTable from "@/components/table/base-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { userList } from "@/lib/mock/users";
import { userColumns } from "./_components/users.columns";
import { IconArrowForwardUp, IconMailForward } from "@tabler/icons-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";


export default function UsersPage() {

  const [data, setData] = useState<IUser[]>(userList);


  return (

    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col items-center justify-between gap-3 mb-7 md:flex-row">
        <AdminPageHeader title="Users" />
        <Link href='/users/dishers'>
          <Button className="flex items-center gap-1.5 font-bold bg-grad-destructive-light">
            <IconArrowForwardUp size={'1.1rem'} />
            Disher
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap w-full gap-6 mt-4 lg:flex-nowrap items center">
        <Input
          type="search"
          placeholder="Name"
          className="w-full h-full py-5"
        />
        <Select>
          <SelectTrigger className="py-5">
            <SelectValue placeholder="Graphic Designer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Graphic Designer</SelectItem>
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

        <BaseTable data={data} columns={userColumns} />
      </div>

    </div>

  );
}
