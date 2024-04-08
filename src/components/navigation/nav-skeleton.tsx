import { Skeleton } from "@/components/ui/skeleton";

export function RecentSearchesNavbarSkeleton () {
    return (
        <div className="mt-2 flex flex-col gap-2 ml-4 pl-2">
            <Skeleton className="w-20 h-3 opacity-50 rounded-sm" />
            <Skeleton className="w-20 h-3 opacity-50 rounded-sm" />
            <Skeleton className="w-20 h-3 opacity-50 rounded-sm" />
            <Skeleton className="w-20 h-3 opacity-50 rounded-sm" />
            <Skeleton className="w-20 h-3 opacity-50 rounded-sm" />
            <Skeleton className="w-20 h-3 opacity-50 rounded-sm" />
        </div>
    )
}