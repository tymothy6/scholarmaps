"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { 
  Card
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
  
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// Components for pagination controls and toggling column visibility
import { DataTablePagination } from "@/components/patterns/table-pagination"
import { DataTableViewOptions } from "@/components/patterns/table-column-toggle"

import { RotateCcwIcon } from "lucide-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function CitationResultTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        }
    })

    const handleResetFilters = () => {
        setColumnFilters([]); 
    };

    return (
        <div>
          <div className="flex items-center py-4 gap-2">
          <Input
          placeholder="Filter results"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="w-full sm:max-w-sm"
          />
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                { table.getColumn("title")?.getFilterValue() ?
                <Button variant="destructive" size="icon" onClick={() => handleResetFilters()}>
                    <span className="sr-only">Reset filters</span>
                    <RotateCcwIcon className="h-4 w-4" />
                </Button>
                : null }
                </TooltipTrigger>
            <TooltipContent className="text-sm">Reset all filters</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          </div>
          <Card>
            <div className="w-full">
            <div className="w-full border-b">
            <Table>
                <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                        <TableHead key={header.id}>
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </TableHead>
                        )
                    })}
                    </TableRow>
                ))}
                </TableHeader>
                <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                    <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                    >
                        {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                        ))}
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={columns.length} className="h-36 text-center">
                        No results.
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </div>
                <div className="flex justify-between items-center px-2 py-4 w-full">
                    <DataTablePagination table={table} />
                    <DataTableViewOptions table={table} />
                </div>
            </div>
        </Card>
        </div>
    )
}

