import type {
    Table as ITable
} from "@tanstack/react-table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DatePicker } from "../ui/date-picker"
import { ArrowUpDown } from "lucide-react"

interface IProps {
    handlePageSize: (value: string) => void;
    showExport?: boolean;
    showDateFilters?: boolean;
}

export function Filters({
    handlePageSize,
    showExport = true,
    showDateFilters = true,
}: IProps) {

    return (
        <div className="flex flex-col lg:items-center justify-between gap-3 my-4 text-sm font-medium md:gap-4 lg:flex-row text-black/60">

            <div className="flex items-center gap-3">
                <span className="text-black/40">Show</span>
                <Select
                    onValueChange={handlePageSize}
                >
                    <SelectTrigger className="flex w-full h-full px-3 py-2 text-sm text-black bg-transparent border border-gray-400 rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <SelectValue placeholder="20" />
                    </SelectTrigger>
                    <SelectContent>
                        {[20, 30, 40, 50].map((pageSize, index) => (
                            <SelectItem key={index} value={pageSize.toString()}>{pageSize}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <span className="text-black/40">Show</span>
            </div>
            <div className="flex flex-col items-center md:justify-end gap-3 max-w-[400px] md:flex-row">
                {
                    showDateFilters && <>
                        <DatePicker className="bg-transparent border-gray-300" placeholder="From" />
                        <DatePicker className="bg-transparent border-gray-300" placeholder="To" />
                    </>
                }
                {
                    showExport &&
                    <Select>
                        <SelectTrigger className="flex h-full px-3 py-2 text-sm text-black bg-transparent border border-gray-300 rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <SelectValue placeholder={<div className="flex items-center gap-2 text-gray-500">
                                <ArrowUpDown size={15} className="" />
                                Export
                            </div>} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={"pdf"}>PDF</SelectItem>
                        </SelectContent>
                    </Select>
                }
            </div>

        </div>


    )
} 