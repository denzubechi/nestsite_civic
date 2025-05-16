"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchTotals } from "@/store/slices/totalSlice";
import { AdminPageHeader } from "./_components/admin-sections";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    totalPortfolios,
    totalProjects,
    totalProducts,
    totalStorefronts,
    totalPaymentLinks,
    loading,
  } = useSelector((state: RootState) => state.totals);

  useEffect(() => {
    dispatch(fetchTotals());
  }, [dispatch]);

  const overviewData = [
    {
      icon: <Icons.calendar />,
      title: totalPortfolios !== null ? totalPortfolios.toString() : null,
      subtitle: "Total Portfolios",
    },
    {
      icon: <Icons.calendar />,
      title: totalProjects !== null ? totalProjects.toString() : null,
      subtitle: "Total Projects",
    },
    {
      icon: <Icons.calendar />,
      title: totalProducts !== null ? totalProducts.toString() : null,
      subtitle: "Total Products",
    },
    {
      icon: <Icons.calendar />,
      title: totalStorefronts !== null ? totalStorefronts.toString() : null,
      subtitle: "Total Storefronts",
    },
  ];

  return (
    <div className="self-stretch flex flex-col gap-4 px-16 mt-8 max-md:px-5 max-md:max-w-full">
      <AdminPageHeader title="Overview">
        <div className="">
          <Select>
            <SelectTrigger className="flex w-full h-full px-3 py-2 text-sm text-black border rounded-md border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <SelectValue placeholder="Last 24 hours" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24hrs">Last 24 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </AdminPageHeader>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
        {overviewData.map((data, index) =>
          loading ? (
            <Skeleton key={index} className="w-full h-20 bg-gray-400" />
          ) : (
            <div
              key={index}
              className="p-2 flex gap-2 w-full rounded border bg-white"
            >
              <div className="aspect-square flex-1 p-2 rounded bg-primary flex items-center justify-center text-white">
                {data.icon}
              </div>
              <div className="flex-[5]">
                <h3 className="text-2xl font-semibold">{data.title}</h3>
                <p className="text-sm text-gray-600">{data.subtitle}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
