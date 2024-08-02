"use client";

import * as React from "react";

// import { useMediaQuery } from "@/lib/use-media-query"

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Reusable component to make any column header sortable & hideable
import { DataTableColumnHeader } from "@/components/patterns/table-column-header";

// Components that rely on hooks
import { AbstractCell, ActionsCell } from "./cells";

// Shape of the data to render in the table
export type BookmarkedPaper = {
  id: string;
  paperId: string;
  title: string;
  url: string;
  abstract: string | null;
  year: number;
  referenceCount: number;
  citationCount: number;
  influentialCitationCount: number;
  tldr: any | null;
  journal: any | null;
  authors: any;
  publicationTypes: string[];
  isOpenAccess: boolean;
  openAccessPdf: any | null;
  bookmarked: boolean;
};

// Shape of the data from /api/bookmarks/fetch with nested paper object
export type BookmarkedPaperResult = {
  id: string;
  userId: string;
  paperId: string;
  searchPaperResultId: string;
  createdAt: Date;
  paper: BookmarkedPaper;
};

// Type guard functions
function isJournalObject(
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

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function isTldrObject(
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

export const columns: ColumnDef<BookmarkedPaper>[] = [
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
        <div className="px-4 py-2">
          <DataTableColumnHeader column={column} title="Title" />
        </div>
      );
    },
    cell: ({ row }) => {
      const title = row.getValue("title");
      const result = row.original;

      return (
        <div className="font-medium p-2">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                variant="link"
                className="w-max whitespace-normal h-max focus-visible:ring-0"
              >
                <span className="w-72 text-left">
                  {typeof title === "string" ? title : "N/A"}
                </span>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="sm:w-40 lg:w-80">
              <div className="space-y-2">
                <div className="flex gap-2 items-start">
                  <h4 className="text-sm font-semibold">
                    {typeof title === "string" ? title : "N/A"}
                  </h4>
                  {isTldrObject(result.tldr) && result.tldr.text ? (
                    <Badge variant="default" className="mr-2 font-hubotSans">
                      tl;dr
                    </Badge>
                  ) : (
                    <div />
                  )}
                </div>
                <div className="flex flex-wrap gap-2 items-center justify-start">
                  {result.isOpenAccess && (
                    <a
                      href={result.openAccessPdf?.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Badge variant="default" className="font-hubotSans">
                        Open access
                      </Badge>
                    </a>
                  )}
                  {result.publicationTypes &&
                    result.publicationTypes.map((publicationType, index) => (
                      <Badge
                        key={publicationType}
                        variant="secondary"
                        className="font-hubotSans"
                      >
                        {publicationType.replace(/([A-Z])/g, " $1").trim()}
                      </Badge>
                    ))}
                </div>
                <p className="text-sm">
                  {isTldrObject(result.tldr)
                    ? result.tldr.text
                    : "No tl;dr available :("}
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      );
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
            {authors.map((author) => author.name).join(", ")}
          </div>
        );
      }
      return <div className="p-2">N/A</div>;
    },
  },
  {
    accessorKey: "journal",
    header: () => <div className="p-2">Journal</div>,
    cell: ({ row }) => {
      const journal = row.getValue("journal");
      return (
        <div className="p-2">
          {isJournalObject(journal) ? journal.name : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "year",
    header: ({ column }) => {
      return (
        <div className="pl-2 py-2">
          <DataTableColumnHeader column={column} title="Year" />
        </div>
      );
    },
    cell: ({ row }) => {
      const year = row.getValue("year");
      return (
        <div className="text-right p-2">
          {typeof year === "number" ? year : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "abstract",
    header: () => <div className="p-2">Abstract</div>,
    cell: ({ row }) => <AbstractCell row={row} />,
  },
  {
    accessorKey: "referenceCount",
    header: () => <div className="p-2">References</div>,
    cell: ({ row }) => {
      const referenceCount = row.getValue("referenceCount");
      return (
        <div className="text-right p-2">
          {typeof referenceCount === "number" ? referenceCount : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "citationCount",
    header: () => <div className="p-2">Citations</div>,
    cell: ({ row }) => {
      const citationCount = row.getValue("citationCount");
      return (
        <div className="text-right p-2">
          {typeof citationCount === "number" ? citationCount : "N/A"}
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
