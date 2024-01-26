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

// Make any column header sortable & hideable
import { DataTableColumnHeader } from "@/components/patterns/table-column-header"

import { MoreHorizontalIcon } from "lucide-react"

// This type needs to match the shape of the data returned from the Semantic Scholar API
export type DashboardResult = {
  id: string
  year: number
  publication: string
  author: string[]
  journal: string
}

async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
}

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
    header: () => <div className="p-2">Author</div>,
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
