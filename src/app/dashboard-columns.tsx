"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

import { MoreHorizontalIcon } from "lucide-react"

// This type is used to define the shape of the data
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

export const columns: ColumnDef<DashboardResult>[] = [
  {
    accessorKey: "publication",
    header: () => <div className="p-3">Publication</div>,
    cell: ({ row }) => <div className="font-medium p-2">{row.getValue("publication") as string}</div>,
  },
  {
    accessorKey: "author",
    header: () => <div className="p-2">Author</div>,
    cell: ({ row }) => <div className="p-2">{(row.getValue("author") as string[]).join(", ")}</div>,
  },
  {
    accessorKey: "journal",
    header: () => <div className="p-2">Journal</div>,
    cell: ({ row }) => <div className="p-2">{row.getValue("journal") as string}</div>,
  },
  {
    accessorKey: "year",
    header: () => <div className="text-right p-2">Year</div>,
    cell: ({ row }) => <div className="text-right p-2">{row.getValue("year") as number}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
        const result = row.original

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <span className="sr-only">Open options menu</span>
                        <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => copyToClipboard(result.publication)}
                    >
                        Copy accession number
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => alert(`Editing ${result.publication}`)}>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => alert(`Deleting ${result.publication}`)}>
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => alert(`Sharing ${result.publication}`)}>
                        Share
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
    }
]