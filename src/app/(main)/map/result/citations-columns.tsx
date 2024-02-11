"use client"

import * as React from "react"

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

  import { DataTableColumnHeader } from "@/components/patterns/table-column-header"

  import { MoreHorizontalIcon } from "lucide-react"

  // Import type from map/page.tsx or move here
  import { PaperCitationResult } from "../page"

  async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  }

  export const columns: ColumnDef<PaperCitationResult>[] = [
    {
        accessorKey: "citingPaper.title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ), 
    },
    {
        accessorKey: "citingPaper.journal",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Journal" />
        ),
    },
    {
        accessorKey: "citingPaper.authors",
        header: () => <div className="flex p-2">Authors</div>,
    },
    {
        accessorKey: "citingPaper.year",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Year" />
        ),
    },
    {
        accessorKey: "citingPaper.referenceCount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="References" />
        ),
    },
    {
        accessorKey: "citingPaper.citationCount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Citations" />
        ),
    },
    {
        accessorKey: "citingPaper.influentialCitationCount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Influential Citations" />
        ),
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
                            onClick={() => copyToClipboard(result.citingPaper.paperId)}
                        >
                            Copy S2 identifier
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            onClick={() => copyToClipboard(result.citingPaper.url)}
                        >
                            Copy S2 URL
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => alert(`Sharing ${result.citingPaper.title}`)}>
                            Share
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={() => alert(`Deleting ${result.citingPaper.title}`)}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

  ]



