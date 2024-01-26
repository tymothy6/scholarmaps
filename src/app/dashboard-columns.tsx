"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

// Reusable component to make any column header sortable & hideable
import { DataTableColumnHeader } from "@/components/patterns/table-column-header"

import { MoreHorizontalIcon } from "lucide-react"

// This type is used to define the shape of the (dummy) data
export type DashboardResult = {
  id: string
  year: number
  publication: string
  author: string[]
  journal: string
}

// Function to copy text & display a toast notification
async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
}

// Type guard to check if a value is a string array
function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}
  
export const columns: ColumnDef<DashboardResult>[] = [
  {
    id: "select",
    header: ({ table }) => {
        return (
            <div className="flex items-center p-2">
                <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                />
            </div>
        )
        },
    cell: ({ row }) => {
        return (
            <div className="flex items-center p-2">
                <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                />
            </div>
        )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "publication",
    header: ({ column }) => {
        return (
            <div className="px-4 py-2">
                <DataTableColumnHeader column={column} title="Publication" />
            </div>
        )
    },
    cell: ({ row }) => {
        const publication = row.getValue("publication");
        return (
            <div className="font-medium p-2">
                {typeof publication === 'string' ? publication : 'N/A'}
            </div>
        )
    },
  },
  {
    accessorKey: "author",
    header: () => <div className="p-2">Authors</div>,
    cell: ({ row }) => {
        const author = row.getValue("author");
        return (
            <div className="p-2">
                {isStringArray(author) ? author.join(", ") : 'N/A'}
            </div>
        )
    }
  },
  {
    accessorKey: "journal",
    header: () => <div className="p-2">Journal</div>,
    cell: ({ row }) => {
        const journal = row.getValue("journal");
        return <div className="p-2">
            {typeof journal === 'string' ? journal : 'N/A'}
        </div>;
    }
  },
  {
    accessorKey: "year",
    header: ({ column }) => {
        return (
            <div className="pl-2 py-2">
                <DataTableColumnHeader column={column} title="Year" />
            </div>
        )
    },
    cell: ({ row }) => {
        const year = row.getValue("year");
        return <div className="text-right p-2">
            {typeof year === 'number' ? year : 'N/A'}
        </div>;
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
        const result = row.original

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <span className="sr-only">Open row options</span>
                        <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => copyToClipboard(result.publication)}
                    >
                        Copy accession
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => alert(`Editing ${result.publication}`)}>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => alert(`Sharing ${result.publication}`)}>
                        Share
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => alert(`Deleting ${result.publication}`)}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
  }
]

export const results: DashboardResult[] = [
    {
        id: "1",
        year: 2021,
        publication: "You can’t compress the program without quantifying the open-source SSL certificate.",
        author: ["Author 1"],
        journal: "Publication 1"
    },
    {
        id: "2",
        year: 2020,
        publication: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
        author: ["Author 2"],
        journal: "Publication 2"
    },
    {
        id: "3",
        year: 2019,
        publication: "The SAS interface is down, bypass the open-source pixel so we can backup the mainframe.",
        author: ["Author 3"],
        journal: "Publication 3"
    },
    {
        id: "4",
        year: 2018,
        publication: "The UTF8 application is down, parse the neural bandwidth so we can parse the exabyte!",
        author: ["Author 4", "Author 5"],
        journal: "Publication 4"
    },
    {
        id: "5",
        year: 2017,
        publication: "Generating the driver won’t do anything, we need to quantify the pixels in 1080p!",
        author: ["Author 6"],
        journal: "Publication 5"
    },
    {
        id: "6",
        year: 2021,
        publication: "You can’t compress the program without quantifying the open-source SSL certificate.",
        author: ["Author 1"],
        journal: "Publication 1"
    },
    {
        id: "7",
        year: 2020,
        publication: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
        author: ["Author 2"],
        journal: "Publication 2"
    },
    {
        id: "8",
        year: 2019,
        publication: "The SAS interface is down, bypass the open-source pixel so we can backup the mainframe.",
        author: ["Author 3"],
        journal: "Publication 3"
    },
    {
        id: "9",
        year: 2018,
        publication: "The UTF8 application is down, parse the neural bandwidth so we can parse the exabyte!",
        author: ["Author 4", "Author 5"],
        journal: "Publication 4"
    },
    {
        id: "10",
        year: 2017,
        publication: "Generating the driver won’t do anything, we need to quantify the pixels in 1080p!",
        author: ["Author 6"],
        journal: "Publication 5"
    }
]