"use client";

import * as React from "react";

import { type Row } from "@tanstack/react-table";
import { type SearchPaperResult } from "./search-columns";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { BookmarkPlus, Delete } from "lucide-react";

interface BookmarkActionProps<TData extends SearchPaperResult> {
  selectedRows: Row<TData>[];
  data: TData[];
}

export function BookmarkAction<TData extends SearchPaperResult>({
  selectedRows,
  data,
}: BookmarkActionProps<TData>) {
  // Check if all selected rows are bookmarked
  // If so we should NOT show the Create button
  const allItemsBookmarked = selectedRows.every(
    (row) =>
      data.find((paper) => paper.paperId === row.original.paperId)?.bookmarked,
  );

  // Check if some selected rows have bookmarked items
  // If so we should still show the Create button
  const someItemsBookmarked = selectedRows.some(
    (row) =>
      data.find((paper) => paper.paperId === row.original.paperId)?.bookmarked,
  );

  const handleCreate = async () => {
    try {
      const paperIds = selectedRows.map(
        (row) => (row.original as SearchPaperResult).paperId,
      );
      const response = await fetch("/api/bookmarks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paperIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to create bookmarks");
      }

      const data = await response.json();
      toast.success(`${data.message}`);
    } catch (error) {
      console.error("Error creating bookmarks:", error);
      toast.error("Failed to create bookmarks.");
    }
  };

  const handleDelete = async () => {
    try {
      const paperIds = selectedRows.map(
        (row) => (row.original as SearchPaperResult).paperId,
      );
      const response = await fetch("/api/bookmarks/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paperIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete bookmark");
      }

      const data = await response.json();
      toast.success(`${data.message}`);
    } catch (error) {
      console.error("Error deleting bookmarks:", error);
      toast.error("Failed to delete bookmarks.");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        {!allItemsBookmarked && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="default"
                onClick={handleCreate}
                disabled={selectedRows.length === 0}
                className="px-2"
              >
                <BookmarkPlus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="text-sm">Create bookmark</TooltipContent>
          </Tooltip>
        )}
        {someItemsBookmarked && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleDelete}
                disabled={selectedRows.length === 0}
                className="border-dashed px-2"
              >
                <Delete className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="text-sm">Delete bookmark</TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </div>
  );
}
