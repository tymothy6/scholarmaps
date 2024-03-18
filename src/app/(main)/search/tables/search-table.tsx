"use client"

import * as React from "react"

import { useMediaQuery } from "@/lib/use-media-query"

import { Button } from "@/components/ui/button"
import { 
  Card
 } from "@/components/ui/card"
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { 
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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

import { FilterIcon, RotateCcwIcon } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

type Filter = {
  value: string
  label: string
}

const filters: Filter[] = [
  {
    value: "title",
    label: "Title",
  },
  {
    value: "authors",
    label: "Authors",
  },
  {
    value: "journal",
    label: "Journal",
  },
  {
    value: "abstract",
    label: "Abstract",
  }
]

export function SearchResultTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const [open, setOpen] = React.useState(false);

  const defaultFilter = filters[0];
  const [selectedFilter, setSelectedFilter] = React.useState<Filter | null>(defaultFilter); // the default filter is the first one


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
  }, [table, visibleColumns])

  const handleResetFilters = () => {
    setColumnFilters([]); 
    setSelectedFilter(defaultFilter);
    if (defaultFilter) {
      table.getColumn(defaultFilter.value)?.setFilterValue('');
    }
  };

  const filteredResults = table.getFilteredRowModel().rows?.length;

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <div className="flex gap-2 items-center">
        <Input
        placeholder={`Filter ${filteredResults} results`}
        value={selectedFilter ? (table.getColumn(selectedFilter.value)?.getFilterValue() as string) ?? "" : ""}
        onChange={(event) => {
          if (selectedFilter) {
            table.getColumn(selectedFilter.value)?.setFilterValue(event.target.value);
          }
        }}
        className="w-full sm:max-w-sm"
        />
        {isDesktop ? (
          <TooltipProvider>
            <Tooltip>
              <Popover open={open} onOpenChange={setOpen}>
                <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button variant="secondary" size={selectedFilter ? "default" : "icon"} className="px-2">
                    {selectedFilter ? <span><FilterIcon className="inline mr-2 h-4 w-4"/>{selectedFilter.label}</span> : <FilterIcon className="h-4 w-4"/>}
                  </Button>
                </PopoverTrigger>
                </TooltipTrigger>
                <PopoverContent className="w-[150px] p-0" align="start">
                  <FilterList setOpen={setOpen} setSelectedFilter={setSelectedFilter} />
                </PopoverContent>
                <TooltipContent className="text-sm">Filter results</TooltipContent>
              </Popover>
            </Tooltip>
          </TooltipProvider>
        ) : 
        (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button variant="secondary" size="default" className="px-2">
                {selectedFilter ? <span>{selectedFilter.label}</span> : <FilterIcon className="h-4 w-4"/> }
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <Tabs defaultValue="filter" className="w-full p-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="filter">
                    Filter
                  </TabsTrigger>
                  <TabsTrigger value="sort">
                    Sort
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="filter">
                  <Card className="overflow-hidden">
                      <FilterList setOpen={setOpen} setSelectedFilter={setSelectedFilter} />
                  </Card>
                </TabsContent>
                <TabsContent value="sort">
                <Card className="overflow-hidden">
                    <SortList setOpen={setOpen} setSelectedFilter={setSelectedFilter} />
                </Card>
                </TabsContent>
              </Tabs>
            </DrawerContent>
          </Drawer>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              { table.getColumn("title")?.getFilterValue() ?
              <Button variant="destructive" size="icon" className="px-2" onClick={() => handleResetFilters()}>
                <span className="sr-only">Reset filters</span>
                <RotateCcwIcon className="h-4 w-4" />
              </Button>
              : null }
            </TooltipTrigger>
          <TooltipContent className="text-sm">Reset all filters</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </div>
        <DataTablePagination table={table} />
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
            <div className="flex items-center gap-4 px-2 py-4 w-full">
              <DataTableViewOptions table={table} />
              <DataTablePagination table={table} />
            </div>
        </div>
      </Card>
    </div>
  )
}

function FilterList({
  setOpen,
  setSelectedFilter,
}: {
  setOpen: (open: boolean) => void
  setSelectedFilter: (filter: Filter | null) => void
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter by..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {filters.map((filter) => (
            <CommandItem
              key={filter.value}
              value={filter.value}
              onSelect={(value) => {
                setSelectedFilter(
                  filters.find((filter) => filter.value === value) || null
                )
                setOpen(false)
              }}
            >
              {filter.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

function SortList({
  setOpen,
  setSelectedFilter,
}: {
  setOpen: (open: boolean) => void
  setSelectedFilter: (filter: Filter | null) => void
}) {
  return (
    <Command>
      <CommandInput placeholder="Sort by..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {filters.map((filter) => (
            <CommandItem
              key={filter.value}
              value={filter.value}
              onSelect={(value) => {
                setSelectedFilter(
                  filters.find((priority) => priority.value === value) || null
                )
                setOpen(false)
              }}
            >
              {filter.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
