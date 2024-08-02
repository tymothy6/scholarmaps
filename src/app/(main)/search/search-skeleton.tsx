import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

import { Loader2Icon } from "lucide-react";

export function CitationGraphSkeleton() {
  return (
    <div className="grid gap-2 mt-2">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-8 w-32" />
      </div>
      <Card className="w-full h-[300px] md:h-[600px]">
        <div className="w-full h-full flex items-center justify-center">
          <Loader2Icon className="text-primary animate-spin h-6 w-6 md:w-12 md:h-12" />
        </div>
      </Card>
    </div>
  );
}

export function SearchTableSkeleton() {
  return (
    <div className="grid gap-2 mt-2">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
      <Card>
        <div className="flex sm:hidden flex-col gap-2 w-full">
          <div className="flex sm:hidden items-center p-4 justify-between w-full border-b">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex sm:hidden items-center px-4 py-6 justify-between w-full border-b">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex sm:hidden items-center px-4 py-6 justify-between w-full border-b">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex sm:hidden items-center px-4 py-6 justify-between w-full border-b">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex sm:hidden items-center px-4 py-6 justify-between w-full border-b">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex sm:hidden items-center px-4 py-6 justify-between w-full border-b">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex sm:hidden items-center px-4 py-6 justify-between w-full border-b">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex sm:hidden items-center px-4 py-6 justify-between w-full border-b">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex sm:hidden items-center px-4 py-6 justify-between w-full border-b">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex sm:hidden items-center px-4 py-6 justify-between w-full border-b">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex sm:hidden items-center px-4 py-6 justify-between w-full border-b">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex sm:hidden items-center px-4 py-6 justify-between w-full border-b">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex sm:hidden items-center p-4 justify-between w-full" />
        </div>
        <div className="hidden sm:flex flex-col gap-2 w-full">
          <div className="hidden sm:flex items-center px-4 py-6 justify-between w-full border-b">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="hidden sm:flex items-center px-4 py-6 justify-between w-full border-b">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="hidden sm:flex items-center px-4 py-6 justify-between w-full border-b">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="hidden sm:flex items-center px-4 py-6 justify-between w-full border-b">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="hidden sm:flex items-center px-4 py-6 justify-between w-full border-b">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="hidden sm:flex items-center px-4 py-6 justify-between w-full border-b">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="hidden sm:flex items-center px-4 py-6 justify-between w-full border-b">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="hidden sm:flex items-center px-4 py-6 justify-between w-full border-b">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="hidden sm:flex items-center px-4 py-6 justify-between w-full border-b">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="hidden sm:flex items-center px-4 py-6 justify-between w-full border-b">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="hidden sm:flex items-center p-4 justify-between w-full" />
        </div>
      </Card>
    </div>
  );
}
