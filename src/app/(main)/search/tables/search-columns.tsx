"use client";

import * as React from "react";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Reusable component to make any column header sortable & hideable
import { DataTableColumnHeader } from "@/components/patterns/table-column-header";

// Cell components that rely on hooks
import { TitleCell, AbstractCell, ActionsCell } from "./cells";

// This type is based on the shape of the data returned from the Semantic Scholar (S2) Academic Graph API
export type SearchPaperResult = {
  paperId: string; // A unique identifier for the paper
  url: string; // URL on the S2 website
  title: string;
  abstract: string; // Due to legal reasons, may be missing for some papers
  year: number; // Year of publication
  referenceCount: number; // Total number of papers referenced by the paper
  citationCount: number; // Total number of citations S2 has found for this paper
  influentialCitationCount: number;
  tldr: {
    model: string;
    text: string; // Auto-generated short summary of the paper from the SciTLDR model
  };
  journal: {
    name: string;
    pages?: string;
    volume?: string;
  };
  authors: Array<{
    authorId: string;
    name: string; //
  }>; // up to 500 authors will be returned
  publicationTypes: string[]; // e.g. "Journal Article", "Conference Paper"
  isOpenAccess: boolean; // Whether the paper is available as open access
  openAccessPdf: {
    url: string; // URL to the open access PDF
    status: string;
  };
  bookmarked: boolean; // whether the paper is bookmarked by the current user
};

// Type guard functions
export function isJournalObject(
  value: unknown,
): value is { name: string; pages?: string; volume?: string } {
  const obj = value as { name: string; pages?: string; volume?: string };
  return (
    typeof obj === "object" &&
    obj !== null &&
    "name" in obj &&
    typeof obj.name === "string" &&
    (!("pages" in obj) || typeof obj.pages === "string") &&
    (!("volume" in obj) || typeof obj.volume === "string")
  );
}

export function isTldrObject(
  value: unknown,
): value is { model: string; text: string } {
  const obj = value as { model: string; text: string };
  return (
    typeof obj === "object" &&
    obj !== null &&
    "model" in obj &&
    typeof obj.model === "string" &&
    "text" in obj &&
    typeof obj.text === "string"
  );
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
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      );
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
      );
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
      );
    },
    cell: ({ row }) => {
      return <TitleCell row={row} />;
    },
  },
  {
    accessorKey: "journal",
    header: ({ column }) => {
      return (
        <div className="flex px-4 py-2">
          <DataTableColumnHeader column={column} title="Journal" />
        </div>
      );
    },
    cell: ({ row }) => {
      const journal = row.getValue("journal");
      return (
        <div className="flex px-4 py-2 w-56 text-left">
          {isJournalObject(journal) ? journal.name : "N/A"}
        </div>
      );
    },
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
      }
      return <div className="p-2">N/A</div>;
    },
  },
  {
    accessorKey: "year",
    header: ({ column }) => {
      return (
        <div className="flex pl-2 py-2">
          <DataTableColumnHeader column={column} title="Year" />
        </div>
      );
    },
    cell: ({ row }) => {
      const year = row.getValue("year");
      return (
        <div className="flex p-2">
          {typeof year === "number" ? year : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "abstract",
    header: () => <div className="flex p-2">Abstract</div>,
    cell: ({ row }) => {
      return <AbstractCell row={row} />;
    },
  },
  {
    accessorKey: "citationCount",
    header: ({ column }) => {
      return (
        <div className="flex justify-end p-2">
          <DataTableColumnHeader column={column} title="Citations" />
        </div>
      );
    },
    cell: ({ row }) => {
      const citationCount = row.getValue("citationCount");
      const result = row.original;

      return (
        <div className="text-right pr-8 sm:pl-4 py-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex transition-colors p-2 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                {typeof citationCount === "number" ? citationCount : "N/A"}
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-sm w-max-12">
                {typeof result.influentialCitationCount === "number"
                  ? result.influentialCitationCount
                  : "N/A"}{" "}
                influential citations
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionsCell row={row} />;
    },
  },
];
