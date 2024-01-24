"use client"

import * as React from "react"

import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { 
    BookIcon,
    NewspaperIcon,
    WaypointsIcon,
    UsersIcon
} from "lucide-react";

export function DashboardCards () {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Results</CardTitle>
                        <BookIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1234</div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">+9.6% from last month</p>
                    </CardContent>
                    </Card>
                    <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Graphs</CardTitle>
                        <WaypointsIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">567</div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">+12.1% from last month</p>
                    </CardContent>
                    </Card>
                    <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Reports</CardTitle>
                        <NewspaperIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">456</div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">+18.1% from last month</p>
                    </CardContent>
                    </Card>
                    <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Teams</CardTitle>
                        <UsersIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">+2 since last month</p>
                    </CardContent>
            </Card>
        </div>
    )
}