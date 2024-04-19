"use client"

import * as React from "react"

import { useMediaQuery } from "@/lib/use-media-query"

import { type SearchPaperResult } from "./reports-search-columns"

import { useFlowContext } from "../context/flow-provider"

import { Button } from "@/components/ui/button" // add paper to graph
import { 
  Card
 } from "@/components/ui/card"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function ReportsSearchResultTable<TData extends SearchPaperResult, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { onPaperSelect } = useFlowContext();


  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [visibleColumns, setVisibleColumns] = React.useState({
    select: true,
    journal: true,
    authors: true,
    year: true,
    abstract: true,
    actions: true,
  });

  React.useEffect(() => {
    setVisibleColumns({
            select: isDesktop,
            journal: isDesktop,
            authors: isDesktop,
            year: isDesktop,
            abstract: isDesktop,
            actions: isDesktop,
        })
  }, [isDesktop])

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
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    }
  })

  React.useEffect(() => {
    if (table) {
      let newVisibility: Record<string, boolean> = {};
      Object.entries(visibleColumns).forEach(([columnName, isVisible]) => {
        newVisibility[columnName] = isVisible;
      }); 

      table.setColumnVisibility(newVisibility);
    }
  }, [table, visibleColumns]);

  const selectedRows = table.getSelectedRowModel().flatRows;

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <Button
            onClick={() => selectedRows.forEach((row) => onPaperSelect(row.original))}
            variant="default"
            disabled={!selectedRows.length}
            >
            {selectedRows.length === 0 ? "Add papers" : `Add ${selectedRows.length === 0 ? '' : selectedRows.length} paper${selectedRows.length > 1 ? "s" : ""}`}
        </Button>
        <DataTablePagination table={table} />
      </div>
      <Card className="overflow-hidden">
        <div className="w-full">
        <div className="w-full border-b">
          <Table className="h-[700px]">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead 
                      key={header.id}
                      className="sticky top-0 bg-background z-[2]"
                      >
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
                  <TableCell colSpan={columns.length} className="h-36 lg:h-72 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
            <div className="flex items-center justify-end p-4 w-full">
              <DataTablePagination table={table} />
            </div>
        </div>
      </Card>
    </div>
  )
}