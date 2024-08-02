"use client";

import * as React from "react";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

import { DataTableColumnHeader } from "@/components/patterns/table-column-header";

import {
  BookmarkPlusIcon,
  FileSearchIcon,
  Link2Icon,
  MoreHorizontalIcon,
  NavigationIcon,
  XIcon,
} from "lucide-react";

// Import type from map/page.tsx or move here
import { PaperCitationResult } from "../../page";

import { isJournalObject } from "../../../search/tables/search-columns";

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
      <DataTableColumnHeader
        column={column}
        title="Title"
        className="px-4 py-2"
      />
    ),
    cell: ({ row }) => {
      const result = row.original;
      const title = row.getValue("title");
      const url = result.citingPaper.url;

      if (typeof title === "string" && typeof url === "string") {
        return (
          <div className="flex items-start justify-start py-2">
            <Button
              variant="link"
              className="text-left items-start justify-start whitespace-normal w-[300px] h-max"
              asChild
            >
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
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex transition-colors rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <div className="p-2 w-[200px]">
                  <p className="text-left truncate text-sm">
                    {authors.map((author) => author.name).join(", ")}
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="max-w-[200px] lg:max-w-[400px]"
              >
                <p className="text-sm text-primary-foreground">
                  {authors.map((author) => author.name).join(", ")}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
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
    cell: ({ row }) => (
      <div className="p-2">
        {typeof row.getValue("year") === "number"
          ? row.getValue("year")
          : "N/A"}
      </div>
    ),
  },
  {
    id: "references",
    accessorKey: "citingPaper.referenceCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="References" />
    ),
    cell: ({ row }) => (
      <div className="p-2">
        {typeof row.getValue("references") === "number"
          ? row.getValue("references")
          : "N/A"}
      </div>
    ),
  },
  {
    id: "citations",
    accessorKey: "citingPaper.citationCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Citations" />
    ),
    cell: ({ row }) => (
      <div className="p-2">
        {typeof row.getValue("citations") === "number"
          ? row.getValue("citations")
          : "N/A"}
      </div>
    ),
  },
  {
    id: "influentialCitations",
    accessorKey: "citingPaper.influentialCitationCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Influential citations" />
    ),
    cell: ({ row }) => (
      <div className="p-2">
        {typeof row.getValue("influentialCitations") === "number"
          ? row.getValue("influentialCitations")
          : "N/A"}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const result = row.original;

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
              onClick={() => {
                if (result.citingPaper.paperId) {
                  window.open(
                    `/map/result?paperId=${result.citingPaper.paperId}`,
                    "_blank",
                  );
                }
              }}
            >
              <NavigationIcon className="h-4 w-4 mr-2" />
              Map citations
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => copyToClipboard(result.citingPaper.paperId)}
            >
              <FileSearchIcon className="h-4 w-4 mr-2" />
              Copy paper ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => copyToClipboard(result.citingPaper.url)}
            >
              <Link2Icon className="h-4 w-4 mr-2" />
              Copy paper URL
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => alert(`Saving ${result.citingPaper.title}`)}
            >
              <BookmarkPlusIcon className="h-4 w-4 mr-2" />
              Save
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => alert(`Deleting ${result.citingPaper.title}`)}
            >
              <XIcon className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
