"use client"

import * as React from "react"

import { useMediaQuery } from "@/lib/use-media-query"

import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
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

export function SearchResultTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
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
  }, [table, visibleColumns])

  return (
    <div>
    <div className="border-b">
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
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
        <div className="flex justify-between items-center p-2 w-full">
            <DataTablePagination table={table} />
            <DataTableViewOptions table={table} />
        </div>
    </div>
  )
}
