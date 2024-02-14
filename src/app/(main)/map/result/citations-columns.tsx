"use client"

import * as React from "react"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
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

import { isJournalObject } from "../../search/search-columns"

async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
}

export const columns: ColumnDef<PaperCitationResult>[] = [
    // {
    //     id: "publicationTypes",
    //     accessorKey: "citingPaper.publicationTypes",
    //     filterFn: (row, value) => {
    //         const publicationTypes = row.original.citingPaper.publicationTypes;

    //         if (Array.isArray(publicationTypes)) {
    //             return publicationTypes.some(publicationType => publicationType.toLowerCase().includes(value.toLowerCase())
    //             );
    //         }
    //         return false;
    //     },
    //     enableHiding: true,
    // },
    {
        id: "title",
        accessorKey: "citingPaper.title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" className="px-4 py-2" />
        ), 
        cell: ({ row }) => {
            const result = row.original;
            const title = row.getValue("title");
            const url = result.citingPaper.url;

            if (typeof title === 'string' && typeof url === 'string') {
                return (
                    <div className="flex py-2">
                        <Button variant="link" className="text-left whitespace-normal w-[300px] h-max" asChild>
                            <a href={url} target="_blank" rel="noreferrer">
                            {row.getValue("title")}
                            </a>
                        </Button>
                    </div>
                );
            } else {
                return <div className="p-2">N/A</div>;
            }
        },
    },
    {
        id: "journal",
        accessorKey: "citingPaper.journal",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Journal" />
        ),
        cell: ({ row }) => {
            const journal = row.getValue("journal");

            return ( 
            <div className="flex py-2">
                {isJournalObject(journal) ? journal.name : "N/A"}
            </div>
            );
        },
    },
    {
        id: "authors",
        accessorKey: "citingPaper.authors",
        header: () => <div className="flex p-2">Authors</div>,
        cell: ({ row }) => {
            const authors = row.getValue("authors");

            if (Array.isArray(authors)) {
                return authors.map((author) => author.name).join(", ");
            } else {
                return <div className="p-2">N/A</div>;
            }
        },
    },
    {
        id: "year",
        accessorKey: "citingPaper.year",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Year" />
        ),
        cell: ({ row }) => <div className="p-2">{typeof row.getValue("year") === 'number' ? row.getValue("year") : 'N/A'}</div>,
    },
    {
        id: "references",
        accessorKey: "citingPaper.referenceCount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="References" />
        ),
        cell: ({ row }) => <div className="p-2">{typeof row.getValue("references") === 'number' ? row.getValue("references") : 'N/A'}</div>,
    },
    {
        id: "citations",
        accessorKey: "citingPaper.citationCount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Citations" />
        ),
        cell: ({ row }) => <div className="p-2">{typeof row.getValue("citations") === 'number' ? row.getValue("citations") : 'N/A'}</div>,
    },
    {
        id: "influentialCitations",
        accessorKey: "citingPaper.influentialCitationCount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Influential citations" />
        ),
        cell: ({ row }) => <div className="p-2">{typeof row.getValue("influentialCitations") === 'number' ? row.getValue("influentialCitations") : 'N/A'}</div>,
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



