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

export function Pagination<TData>({ tableLib }: { tableLib: ITable<TData> }) {

    return (

        <div className="flex flex-col items-center justify-between gap-3 mt-4 text-sm font-medium text-black md:gap-4 md:flex-row">
            <div className="flex items-center gap-1.5">

                <span>Showing</span>
                <span>
                    {tableLib.getState().pagination.pageIndex + 1} to {tableLib.getPageCount()} of{' '}
                    {tableLib.getPageCount()}
                </span>
                <span> entries</span>

            </div>
            <div className="flex flex-col items-center gap-3 md:flex-row">
                <div className="flex items-center text-sm">
                    <button
                        className="flex items-center gap-1 px-5 py-3 text-sm border border-r-0 border-gray-500 rounded-l-md"
                        onClick={() => tableLib.previousPage()}
                        disabled={!tableLib.getCanPreviousPage()}
                    >
                        Previous
                    </button>
                    <button
                        className="flex items-center gap-1 px-5 py-3 text-sm text-white border border-r-0 border-gray-500 bg-primary"
                        onClick={() => tableLib.previousPage()}
                        disabled={!tableLib.getCanPreviousPage()}
                    >
                        1
                    </button>
                    <button
                        className="flex items-center gap-1 px-5 py-3 text-sm border border-r-0 border-gray-500"
                        onClick={() => tableLib.previousPage()}
                        disabled={!tableLib.getCanPreviousPage()}
                    >
                        2
                    </button>
                    <button
                        className="flex items-center gap-1 px-5 py-3 text-sm border border-gray-500 rounded-r-md"
                        onClick={() => tableLib.nextPage()}
                        disabled={!tableLib.getCanNextPage()}
                    >
                        Next
                    </button>
                </div>
            </div>

        </div>
    )
} 