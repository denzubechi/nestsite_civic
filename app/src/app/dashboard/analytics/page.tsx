"use client"
import { useEffect, useState } from "react";
import { AdminPageHeader } from "../_components/admin-sections";
import BaseTable from "@/components/table/base-table";
import { newsColumns } from "@/components/table/columns/news.columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PieChart, Search } from "lucide-react";
import { newsList } from "@/lib/mock/news";
import { TotalUsersChart } from "./_components/TotalUsersChart";
import { UsersByCountry } from "./_components/UsersByCountry";
import { Bookings } from "./_components/Bookings";
import { TotalRevenue } from "./_components/TotalRevenue";
import { Visitors } from "./_components/Visitors";
import { Stat } from "./_components/Stat";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AnalyticsPage() {


  return (

    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">

      <AdminPageHeader title="Analytics">

        <Button className="flex items-center w-fit h-full gap-3 py-5">
          <PieChart />
          Export Analysis
        </Button>
      </AdminPageHeader>

      <div className="mt-6 leading-[140%] max-md:max-w-full grid md:grid-cols-3 gap-4">
        <Stat
          title="Link Clicks"
          change="+2.50%"
          count={13000}
          subText="Active Users"
          subTextChange="20%"
          rightElement={
            <Select>
              <SelectTrigger className="flex w-full px-3 py-5 text-sm text-black border rounded-md border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <SelectValue placeholder="Last 24 hours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24hrs">Last 24 hours</SelectItem>
              </SelectContent>
            </Select>
          }
        />
        <Stat
          title="Total Sales"
          change="+2.50%"
          count={13000}
          subText="Active Orders"
          subTextChange="20%"
          color="red"
          rightElement={
            <Select>
              <SelectTrigger className="flex w-full px-3 py-5 text-sm text-black border rounded-md border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <SelectValue placeholder="Last 24 hours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24hrs">Last 24 hours</SelectItem>
              </SelectContent>
            </Select>
          }
        />
        <Stat
          title="Users by Country"
          change="+2.50%"
          count={13000}
          subText="Active Users"
          subTextChange="20%"
          rightElement={
            <Select>
              <SelectTrigger className="flex w-full px-3 py-5 text-sm text-black border rounded-md border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <SelectValue placeholder="Last 24 hours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24hrs">Last 24 hours</SelectItem>
              </SelectContent>
            </Select>
          }
        />
      </div>
      <div className="mt-6 leading-[140%] max-md:max-w-full grid md:grid-cols-12 gap-4">
        <Visitors className="md:col-span-7" rightElement={
          <Select>
            <SelectTrigger className="flex w-full px-3 py-5 text-sm text-black border rounded-md border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <SelectValue placeholder="Last 24 hours" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24hrs">Last 24 hours</SelectItem>
            </SelectContent>
          </Select>
        } />
        <TotalUsersChart className="md:col-span-5" rightElement={
          <Select>
            <SelectTrigger className="flex w-full px-3 py-5 text-sm text-black border rounded-md border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <SelectValue placeholder="Last 24 hours" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24hrs">Last 24 hours</SelectItem>
            </SelectContent>
          </Select>
        } />

        <TotalRevenue className="md:col-span-12"
          rightElement={
            <Select>
              <SelectTrigger className="flex w-full px-3 py-5 text-sm text-black border rounded-md border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <SelectValue placeholder="Last 24 hours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24hrs">Last 24 hours</SelectItem>
              </SelectContent>
            </Select>
          } />
      </div>

    </div>

  );
}
