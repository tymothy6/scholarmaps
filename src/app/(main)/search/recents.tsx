"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { type RecentSearchResponse } from "./page";
import { formatMMDDTimestamp } from "@/lib/timestamp";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export function RecentSearches({
  recentSearches,
}: {
  recentSearches: RecentSearchResponse[];
}) {
  const router = useRouter();

  const handleClick = (query: string) => {
    try {
      router.push(`/search?query=${query}`);
    } catch (error) {
      console.error("Error retrieving recent search:", error);
      toast.error("Error retrieving recent search. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full mt-2">
      <h3>Recent searches</h3>
      <ul className="flex flex-wrap gap-2">
        {recentSearches.length > 0 ? (
          recentSearches.map((search, index) => (
            <li key={index}>
              <Button
                onClick={() => handleClick(search.query)}
                className="w-max p-4 text-sm font-medium border text-foreground bg-background hover:bg-muted"
              >
                <span>{search.query}</span>
              </Button>
            </li>
          ))
        ) : (
          <li>
            <Card className="w-max p-4 text-sm font-medium hover:bg-muted">
              No recent searches found 🥹
            </Card>
          </li>
        )}
      </ul>
    </div>
  );
}
