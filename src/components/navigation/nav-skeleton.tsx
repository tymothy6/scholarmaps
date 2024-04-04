import { Skeleton } from "@/components/ui/skeleton";

export function RecentSearchesNavbarSkeleton () {
    return (
        <div className="flex flex-col gap-2 border-l border-gray-600 ml-4 pl-2">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-20 h-4" />
        </div>
    )
}