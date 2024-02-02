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
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 w-full">
            <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-semibold">Results</CardTitle>
                        <BookIcon className="w-6 h-6" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-mono font-bold">1234</div>
                        <p className="text-sm text-muted-foreground">+9.6% from last month</p>
                    </CardContent>
                    </Card>
                    <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-semibold">Graphs</CardTitle>
                        <WaypointsIcon className="w-6 h-6" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-mono font-bold">567</div>
                        <p className="text-sm text-muted-foreground">+12.1% from last month</p>
                    </CardContent>
                    </Card>
                    <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-semibold">Reports</CardTitle>
                        <NewspaperIcon className="w-6 h-6" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-mono font-bold">456</div>
                        <p className="text-sm text-muted-foreground">+18.1% from last month</p>
                    </CardContent>
                    </Card>
                    <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-semibold">Teams</CardTitle>
                        <UsersIcon className="w-6 h-6" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-mono font-bold">3</div>
                        <p className="text-sm text-muted-foreground">+2 since last month</p>
                    </CardContent>
            </Card>
        </div>
    )
}