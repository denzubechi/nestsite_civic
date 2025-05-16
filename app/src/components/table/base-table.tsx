import {
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Pagination } from "./table-pagination";
import { TableFilters } from "./table-filters";
import { Filters } from "../ui/filters";

export default function BaseTable({
	data,
	columns,
	showFilters = true,
	showPagination = true,
}: {
	columns: any;
	data: any;
	showFilters?: boolean;
	showPagination?: boolean;
}) {
	const table = useReactTable({
		data,
		columns,
		// state: {
		// sorting,
		//   columnVisibility,
		//   rowSelection,
		//   columnFilters,
		// },
		enableRowSelection: true,
		// onRowSelectionChange: setRowSelection,
		// onSortingChange: setSorting,
		// onColumnFiltersChange: setColumnFilters,
		// onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	const handlePageSize = (value: string) => {
		table.setPageSize(Number(value))
	}

	return (
		<>
			{showFilters && <Filters handlePageSize={handlePageSize} />}
			<Table className="overflow-auto">
				<TableHeader className="bg-white">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className="px-12">
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id} colSpan={header.colSpan} className="px-6 py-6 font-bold">
										{header.isPlaceholder
											? null
											: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row, index) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
								className={`${index % 2 != 0 && 'bg-white'}`}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell className="px-6" key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{showPagination && <Pagination tableLib={table} />}
		</>
	);
}
