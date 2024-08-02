import { Metadata } from "next";
import { Suspense } from "react";

import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { LineChartCard } from "@/components/patterns/chart-card";
import { DashboardCards } from "@/components/patterns/dashboard-card";
import {
  type BookmarkedPaperResult,
  columns,
} from "./tables/dashboard-fetch-columns";
import { DashboardResultTable } from "./tables/dashboard-table";
import { LogoutAuth } from "@/components/auth/logout-auth";
import NovelTailwindEditor from "@/components/novel/editor";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your Scholar Maps activity",
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!session) {
    redirect("/login");
  }

  async function fetchBookmarks(userId: string) {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const url = `${baseUrl}/api/bookmarks/fetch`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
        next: {
          revalidate: 180, // 3 minutes
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching bookmarks.");
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      if (error instanceof Error) {
        return { data: [], error: error.message };
      } else {
        return {
          data: [],
          error: "An error occurred while fetching bookmarks.",
        };
      }
    }
  }

  async function DashboardBookmarksCard() {
    const { data: bookmarks, error } = await fetchBookmarks(userId ?? "");

    // Map across the data to get the papers for the table
    const paperData = bookmarks.map(
      (bookmark: BookmarkedPaperResult) => bookmark.paper,
    );

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardResultTable
          columns={columns}
          data={paperData}
          error={error}
        />
      </Suspense>
    );
  }

  return (
    <section className="p-4 lg:p-8 flex flex-col gap-2">
      <h1 className="mt-2 lg:mt-0 text-xl lg:text-2xl font-semibold lg:font-bold mb-2">
        Dashboard
      </h1>
      <div className="grid gap-4 w-full">
        <DashboardCards />
        <LineChartCard />
        <h2 className="hidden sm:block text-lg lg:text-xl font-semibold mt-2">
          Bookmarks
        </h2>
        <DashboardBookmarksCard />
        <h2 className="hidden sm:block text-lg lg:text-xl font-semibold mt-2">
          Notes
        </h2>
        <NovelTailwindEditor />
      </div>
      <div className="p-4">
        <LogoutAuth />
      </div>
    </section>
  );
}

export const revalidate = 180; // page level revalidation
// see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
