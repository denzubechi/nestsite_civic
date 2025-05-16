"use client"
import { INews } from "@/interfaces";
// import { Booking } from "@/lib/interface";
// import { getAllBookings } from "@/services/booking.service";
import { useEffect, useState } from "react";
import { AdminPageHeader } from "../_components/admin-sections";
import BaseTable from "@/components/table/base-table";
import { newsColumns } from "@/components/table/columns/news.columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { newsList } from "@/lib/mock/news";
// import LoadingScreen from "@/components/LoadingScreen";


export default function NewsPage() {

  const [data, setData] = useState<INews[]>(newsList);


  return (

    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">

      <AdminPageHeader title="News" />
      <div className="flex flex-wrap w-full gap-6 mt-4 lg:flex-nowrap items center">
        <Input
          type="search"
          placeholder="New&apos;s Name"
          className="w-full h-full py-5"
        />
        <Input
          type="search"
          placeholder="Title"
          className="w-full h-full py-5"
        />
        <Button className="flex items-center w-full h-full gap-3 py-5">
          <Search size={'1.1rem'} />
          Search
        </Button>
      </div>

      <div className="flex flex-col mt-6 leading-[140%] max-md:max-w-full">

        <BaseTable data={data} columns={newsColumns} />
      </div>

    </div>

  );
}
