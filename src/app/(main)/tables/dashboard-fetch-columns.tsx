"use client"

import * as React from "react"

import { useMediaQuery } from "@/lib/use-media-query"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

// Reusable component to make any column header sortable & hideable
import { DataTableColumnHeader } from "@/components/patterns/table-column-header"

// Components that rely on hooks
import { AbstractCell, ActionsCell } from "./cells"

// This type is based on the shape of the data returned from the Semantic Scholar (S2) Academic Graph API
export type DashboardPaperResult = {
  paperId: string // A unique identifier for the paper
  url: string // URL on the S2 website
  title: string 
  year: number // Year of publication
  authors: Array<{
    authorId: string
    name: string // 
  }> // An array of objects, up to 500 authors will be returned
  abstract: string // Due to legal reasons, may be missing for some papers
  tldr: {
    model: string;
    text: string; // Auto-generated short summary of the paper from the SciTLDR model
  } 
  referenceCount: number // Total number of papers referenced by the paper
  citationCount: number // Total number of citations S2 has found for this paper
  influentialCitationCount: number 
  publicationTypes: string[] // Journal Article, Conference, Review, etc
  journal: {
    name: string;
    pages?: string;
    volume?: string;
  }
}

// Type guard functions
function isJournalObject(value: unknown): value is { name: string; pages?: string; volume?: string } {
    const obj = value as { name: string; pages?: string; volume?: string };
    return typeof obj === 'object' && obj !== null &&
           'name' in obj && typeof obj.name === 'string' &&
           (!('pages' in obj) || (typeof obj.pages === 'string')) &&
           (!('volume' in obj) || (typeof obj.volume === 'string'));
  }

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(item => typeof item === 'string');
  }

function isTldrObject(value: unknown): value is { model: string; text: string } {
    const obj = value as { model: string; text: string; };
    return typeof obj === 'object' && obj !== null &&
           'model' in obj && typeof obj.model === 'string' &&
            'text' in obj && typeof obj.text === 'string';
  }
  
export const columns: ColumnDef<DashboardPaperResult>[] = [
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
    accessorKey: "title",
    header: ({ column }) => {
        return (
            <div className="px-4 py-2">
                <DataTableColumnHeader column={column} title="Title" />
            </div>
        )
    },
    cell: ({ row }) => {
        const title = row.getValue("title");
        const publicationType = row.getValue("publicationTypes");
        const tldr = row.getValue("tldr");
        return (
            <div className="font-medium p-2">
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Button variant="link">{typeof title === 'string' ? title : 'N/A'}</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="sm:w-40 lg:w-80">
                        <div className="space-y-1">
                            <h4 className="text-sm font-semibold">{typeof title === 'string' ? title : 'N/A'}</h4>
                            <p className="text-sm">{isStringArray(publicationType) ? publicationType.join(", ") : 'N/A'}</p>
                            <p className="text-sm">
                                {isTldrObject(tldr) ? tldr.text : 'No tl;dr available :('}
                            </p>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>
        )
    },
  },
  {
    accessorKey: "authors",
    header: () => <div className="p-2">Authors</div>,
    cell: ({ row }) => {
        const authors = row.getValue("authors");
        if (Array.isArray(authors)) {
            return (
                <div className="p-2">
                    {authors.map(author => author.name).join(", ")}
                </div>
            );
        }
        return <div className="p-2">N/A</div>;
    }
  },
  {
    accessorKey: "journal",
    header: () => <div className="p-2">Journal</div>,
    cell: ({ row }) => {
        const journal = row.getValue("journal");
        return <div className="p-2">
            {isJournalObject(journal) ? journal.name : 'N/A'}
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
    accessorKey: "abstract",
    cell: ({ row }) => {
        <AbstractCell row={row} />
    }
  },
  {
    id: "references",
    header: () => <div className="p-2">References</div>,
    cell: ({ row }) => {
        const referenceCount = row.getValue("referenceCount");
        return <div className="text-right p-2">
            {typeof referenceCount === 'number' ? referenceCount : 'N/A'}
        </div>;
    }
  },
  {
    id: "citations",
    header: () => <div className="p-2">Citations</div>,
    cell: ({ row }) => {
        const citationCount = row.getValue("citationCount");
        return <div className="text-right p-2">
            {typeof citationCount === 'number' ? citationCount : 'N/A'}
        </div>;
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
        return <ActionsCell row={row} />
    }
  }
]
