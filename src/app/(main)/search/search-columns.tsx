"use client"

import * as React from "react"

import { useMediaQuery } from "@/lib/use-media-query"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
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
import { 
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
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
  publicationTypes: string[] // e.g. "Journal Article", "Conference Paper"
}

async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
}

// Type guard functions
export function isJournalObject(value: unknown): value is { name: string; pages?: string; volume?: string } {
    const obj = value as { name: string; pages?: string; volume?: string };
    return typeof obj === 'object' && obj !== null &&
           'name' in obj && typeof obj.name === 'string' &&
           (!('pages' in obj) || (typeof obj.pages === 'string')) &&
           (!('volume' in obj) || (typeof obj.volume === 'string'));
  }

export function isTldrObject(value: unknown): value is { model: string; text: string } {
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
            <div className="pl-4 pr-2 sm:pr-6 py-2">
                <DataTableColumnHeader column={column} title="Title" />
            </div>
        )
    },
    cell: ({ row }) => {
        const result = row.original;
        const title = row.getValue("title");
        const journal = row.getValue("journal");
        const authors = row.getValue("authors");
        const abstract = row.getValue("abstract");

        const [open, setOpen] = React.useState(false);
        const isDesktop = useMediaQuery("(min-width: 768px)");

        if (isDesktop) {
            return (
                <div className="pl-0 pr-2 py-2">
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Button variant="link" className="w-max whitespace-normal h-max focus-visible:ring-0" asChild>
                                <a href={result.url} target="_blank" rel="noopener noreferrer">
                                <span className="w-72 text-left">{typeof title === 'string' ? title : 'N/A'}</span>
                                </a>
                            </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-40 lg:w-80">
                            <div className="space-y-2">
                                <div className="flex gap-2 items-start">
                                    <h4 className="text-sm font-semibold">{typeof title === 'string' ? title : 'N/A'}</h4>
                                    <Badge variant="default" className="mr-2 font-hubotSans">tl;dr</Badge>
                                </div>
                                <div className="flex flex-wrap gap-2 items-center justify-start">
                                {result.publicationTypes && result.publicationTypes.map((publicationType, index) => (
                                    <Badge key={publicationType} variant="secondary" className="font-hubotSans">
                                    {publicationType.replace(/([A-Z])/g, ' $1').trim()}
                                    </Badge>
                                ))}
                                </div>
                                <p className="text-sm">
                                    {isTldrObject(result.tldr) ? result.tldr.text : 'No tl;dr available :('}
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            )
        }

        if (Array.isArray(authors)) {
            return (
                <div className="pl-0 pr-2 py-0">
                    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground>
                    <DrawerTrigger asChild>
                        <Button variant="link" className="w-56 h-max whitespace-normal justify-start focus-visible:ring-0">
                        <span className="text-left">{typeof title === 'string' ? title : 'N/A'}</span>
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className="flex flex-col max-h-[90%]">
                        <DrawerHeader>
                            <DrawerTitle className="text-left">{typeof title === 'string' ? title : 'N/A'}</DrawerTitle>
                            <p className="text-left text-sm">
                                {authors.map(author => author.name).join(", ")}
                            </p>
                            <p className="text-left text-sm font-medium">
                                {isJournalObject(journal) ? journal.name : 'N/A'} ({typeof result.year === 'number' ? result.year : 'N/A'})
                            </p>
                            <div className="flex flex-wrap gap-2 items-center justify-start">
                                {result.publicationTypes && result.publicationTypes.map((publicationType, index) => (
                                    <Badge key={publicationType} variant="secondary" className="font-hubotSans">
                                    {publicationType.replace(/([A-Z])/g, ' $1').trim()}
                                    </Badge>
                                ))}
                            </div>
                        </DrawerHeader>
                        <div className="flex flex-col gap-2 px-4 items-start w-full">
                        <Popover>
                            <PopoverTrigger><Badge variant="default" className="mr-2 w-max font-hubotSans">tl;dr</Badge>
                            </PopoverTrigger>
                            <PopoverContent side="right" className="max-w-[200px] p-2 bg-primary text-primary-foreground border-primary">
                                <p className="text-sm">TLDRs (too long; didn&apos;t read) are short summaries generated by the <a href="https://arxiv.org/abs/2004.15011" target="_blank" rel="noopener noreferrer" className="underline-offset-2 underline font-medium">SciTLDR</a> model.</p></PopoverContent>
                        </Popover>
                        <DrawerDescription>{isTldrObject(result.tldr) ? result.tldr.text : 'No tl;dr available :('}</DrawerDescription>
                        </div>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button variant="secondary">Close</Button>
                            </DrawerClose>
                            <Drawer nested={true}>
                            <DrawerTrigger asChild>
                                <Button variant="default">
                                    View abstract
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent className="flex flex-col">
                                <DrawerHeader>
                                    <DrawerTitle className="text-left">{typeof title === 'string' ? title : 'N/A'}</DrawerTitle>
                                </DrawerHeader>
                                <div className="px-4 max-h-[50vh] overflow-y-scroll">
                                <DrawerDescription>{typeof abstract === 'string' ? abstract : '🥹 Abstract not available from Semantic Scholar.'}</DrawerDescription>
                                </div>
                                <DrawerFooter>
                                    <DrawerClose asChild>
                                        <Button variant="secondary">Close</Button>
                                    </DrawerClose>
                                    <Button variant="default" asChild>
                                            <a href={result.url} target="_blank" rel="noopener noreferrer">View source</a>
                                    </Button>
                                </DrawerFooter>
                            </DrawerContent>
                            </Drawer>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
                </div>
            )
        }
    },
  },
  {
    accessorKey: "journal",
    header: ({ column }) => {
        return (
            <div className="flex px-4 py-2">
                <DataTableColumnHeader column={column} title="Journal" />
            </div>
        )
    },
    cell: ({ row }) => {
        const journal = row.getValue("journal");
        return <div className="flex px-4 py-2 text-left">
            {isJournalObject(journal) ? journal.name : 'N/A'}
        </div>;
    }
  },
  {
    accessorKey: "authors",
    header: () => <div className="flex p-2">Authors</div>,
    cell: ({ row }) => {
        const authors = row.getValue("authors");
        if (Array.isArray(authors)) {
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="flex transition-colors rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                        <div className="p-2 w-[200px]">
                          <p className="text-left truncate">{authors.map(author => author.name).join(", ")}</p>
                        </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="max-w-[200px] lg:max-w-[400px]">
                          <p className="text-sm">
                            {authors.map(author => author.name).join(", ")}
                          </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        }
        return <div className="p-2">N/A</div>;
    }
  },
  {
    accessorKey: "year",
    header: ({ column }) => {
        return (
            <div className="flex pl-2 py-2">
                <DataTableColumnHeader column={column} title="Year" />
            </div>
        )
    },
    cell: ({ row }) => {
        const year = row.getValue("year");
        return <div className="flex p-2">
            {typeof year === 'number' ? year : 'N/A'}
        </div>;
    }
  },
  {
    accessorKey: "abstract",
    header: () => <div className="flex p-2">Abstract</div>,
    cell: ({ row }) => {
        const abstract = row.getValue("abstract");
        const title = row.getValue("title");
        const authors = row.getValue("authors");
        const result = row.original;

        const [open, setOpen] = React.useState(false);
        const isDesktop = useMediaQuery("(min-width: 768px)");

        if (isDesktop && Array.isArray(authors)) {
            return (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="ml-3">
                            <span className="sr-only">View abstract</span>
                            <InfoIcon className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] sm:max-h-[550px]">
                        <DialogHeader>
                            <DialogTitle>{typeof title === 'string' ? title : 'N/A'}</DialogTitle>
                            <ScrollArea className="w-full max-h-[100px]">
                                <DialogDescription className="text-popover-foreground">{authors.map(author => author.name).join(", ")}</DialogDescription>
                            </ScrollArea>
                        </DialogHeader>
                        <ScrollArea className="w-full max-h-[300px]">
                        <DialogDescription>
                            {typeof abstract === 'string' ? abstract : '🥹 Abstract not available from Semantic Scholar.'}
                        </DialogDescription>
                        </ScrollArea>
                        <DialogFooter className="sm:justify-end">
                            <DialogClose asChild>
                                <Button variant="secondary">Close</Button>
                            </DialogClose>
                            <Button variant="default" asChild>
                                <a href={result.url} target="_blank" rel="noopener noreferrer">View source</a>
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )
        }

        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button variant="outline" className="flex">
                        <InfoIcon className="h-4 w-4" />
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col">
                    <DrawerHeader>
                        <DrawerTitle className="text-left">{typeof title === 'string' ? title : 'N/A'}</DrawerTitle>
                    </DrawerHeader>
                    <div className="px-4 max-h-[50vh] overflow-y-scroll">
                    <DrawerDescription>{typeof abstract === 'string' ? abstract : 'Failed to load abstract from Semantic Scholar.'}</DrawerDescription>
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="secondary">Close</Button>
                        </DrawerClose>
                        <Button variant="default" asChild>
                                <a href={result.url} target="_blank" rel="noopener noreferrer">View source</a>
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }
  },
  {
    accessorKey: "citationCount",
    header: ({ column }) => {
        return (
            <div className="flex justify-end p-2">
                <DataTableColumnHeader column={column} title="Citations" />
            </div>
        )
    },
    cell: ({ row }) => {
        const citationCount = row.getValue("citationCount");
        const result = row.original;

        return <div className="text-right pr-8 sm:pl-4 py-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger className="flex transition-colors p-2 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                    {typeof citationCount === 'number' ? citationCount : 'N/A'}
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-sm w-max-12">
                        {typeof result.influentialCitationCount === 'number' ? result.influentialCitationCount : 'N/A'} influential citations
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
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
                        Copy S2 identifier
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        onClick={() => copyToClipboard(result.url)}
                    >
                        Copy S2 URL
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
