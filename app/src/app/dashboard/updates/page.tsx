"use client"
import { IBlog } from "@/interfaces";
import { useState } from "react";
import { AdminPageHeader } from "../_components/admin-sections";
import BaseTable from "@/components/table/base-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { blogList } from "@/lib/mock/blogs";
import { blogColumns } from "./_components/blogs.columns";
import { IconPlus } from "@tabler/icons-react";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/lib/constants";

export default function UpdatesPage() {
  const router = useRouter();
  const [data, setData] = useState<IBlog[]>(blogList);

  return (

    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">
        <div className="flex items-center gap-3 justify-between flex-col md:flex-row mb-4">
          <AdminPageHeader title="Updates" />
          <Button className="flex items-center gap-3 font-bold" onClick={() => router.push(ROUTE.PUBLISH_NEW_POST)}>
            <IconPlus size={'1.1rem'} />
            Publish New Post
          </Button>
        </div>
      <div className="flex flex-wrap w-full gap-6 mt-4 lg:flex-nowrap items center">
        <Input
          type="search"
          placeholder="Blog Title"
          className="w-full h-full py-5"
        />
        <Select>
            <SelectTrigger className="flex w-full h-full px-3 py-5 text-sm text-black border rounded-md border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="light">All Categories</SelectItem>
            </SelectContent>
        </Select>
        <Select>
            <SelectTrigger className="flex w-full h-full px-3 py-5 text-sm text-black border rounded-md border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="light">All Status~</SelectItem>
            </SelectContent>
        </Select>
        <Button className="flex items-center w-full h-full gap-3 py-5">
          <Search size={'1.1rem'} />
          Search
        </Button>
      </div>

      <div className="flex flex-col mt-6 leading-[140%] max-md:max-w-full">
        <BaseTable data={data} columns={blogColumns} />
      </div>
    </div>

  );
}
