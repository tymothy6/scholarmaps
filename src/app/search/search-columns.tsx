"use client"

import * as React from "react"

import { useMediaQuery } from "@/lib/use-media-query"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { toast } from "sonner"

// Reusable component to make any column header sortable & hideable
import { DataTableColumnHeader } from "@/components/patterns/table-column-header"

import { InfoIcon, MoreHorizontalIcon, BookMarkedIcon, LayersIcon } from "lucide-react"

// This type is based on the shape of the data returned from the Semantic Scholar (S2) Academic Graph API
export type SearchPaperResult = {
  paperId: string // A unique identifier for the paper
  url: string // URL on the S2 website
  title: string 
  abstract: string // Due to legal reasons, may be missing for some papers
  year: number // Year of publication
  referenceCount: number // Total number of papers referenced by the paper
  citationCount: number // Total number of citations S2 has found for this paper
  influentialCitationCount: number 
  tldr: {
    model: string;
    text: string; // Auto-generated short summary of the paper from the SciTLDR model
  } 
  journal: {
    name: string;
    pages?: string;
    volume?: string;
  }
  authors: Array<{
    authorId: string
    name: string // 
  }> // up to 500 authors will be returned
}

async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
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
  
export const columns: ColumnDef<SearchPaperResult>[] = [
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
        const tldr = row.getValue("tldr");
        return (
            <div className="p-2">
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Button variant="link" className="w-max">
                            <span className="w-72 truncate text-left">{typeof title === 'string' ? title : 'N/A'}</span>
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="sm:w-40 lg:w-80">
                        <div className="space-y-1">
                            <h4 className="text-sm font-semibold">{typeof title === 'string' ? title : 'N/A'}</h4>
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
    accessorKey: "journal",
    header: ({ column }) => {
        return (
            <div className="px-4 py-2">
                <DataTableColumnHeader column={column} title="Journal" />
            </div>
        )
    },
    cell: ({ row }) => {
        const journal = row.getValue("journal");
        return <div className="p-2">
            {isJournalObject(journal) ? journal.name : 'N/A'}
        </div>;
    }
  },
  {
    accessorKey: "authors",
    header: () => <div className="p-2">Authors</div>,
    cell: ({ row }) => {
        const authors = row.getValue("authors");
        if (Array.isArray(authors)) {
            return (
                <div className="p-2 w-[200px]">
                    <p className="truncate">{authors.map(author => author.name).join(", ")}</p>
                </div>
            );
        }
        return <div className="p-2">N/A</div>;
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
    header: () => <div className="p-2">Abstract</div>,
    cell: ({ row }) => {
        const abstract = row.getValue("abstract");
        const [open, setOpen] = React.useState(false);
        const isDesktop = useMediaQuery("(min-width: 768px)");

        if (isDesktop) {
            return (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <InfoIcon className="h-4 w-4 mr-2" />
                            <span className="sm:block">Abstract</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Abstract</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>{typeof abstract === 'string' ? abstract : 'Failed to load abstract'}</DialogDescription>
                        <DialogFooter className="sm:justify-end">
                            <DialogClose asChild>
                                <Button variant="secondary">Close</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )
        }

        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button variant="outline">
                        <InfoIcon className="h-4 w-4" />
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Abstract</DrawerTitle>
                        <DrawerDescription>{typeof abstract === 'string' ? abstract : 'Failed to load abstract'}</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="secondary">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }
  },
  {
    id: "citations",
    header: ({ column }) => {
        return (
            <div className="px-4 py-2">
                <DataTableColumnHeader column={column} title="Citations" />
            </div>
        )
    },
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
                        onClick={() => copyToClipboard(result.paperId)}
                    >
                        Copy S2 ID
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => alert(`Editing ${result.title}`)}>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => alert(`Sharing ${result.title}`)}>
                        Share
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => alert(`Deleting ${result.title}`)}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
  }
]
