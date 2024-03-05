"use client"

import * as React from 'react';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
    Tabs,
    TabsList,
    TabsTrigger,
 } from '@/components/ui/tabs';

export function ReportHeader () {
    const [isEditing, setIsEditing] = React.useState(false);
    const [reportName, setReportName] = React.useState('New Report');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReportName(e.target.value);
    }

    const handleBlur = () => {
        setIsEditing(false);
    }

    return (
        <section className="flex items-center gap-2 w-full">
        <div>
            <Tabs defaultValue="create" className="w-[300px]">
                <TabsList>
                    <TabsTrigger value="create">Create</TabsTrigger>
                    <TabsTrigger value="edit">Connect</TabsTrigger>
                    <TabsTrigger value="share">Share</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
        <div className="flex items-center gap-4 px-2 w-full">
            <h4 className="text-sm text-muted-foreground w-max">My Reports</h4>
            <Separator orientation="vertical" className="h-4" />
            {isEditing ? (
                    <Input
                        type="text"
                        value={reportName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className="text-sm font-sans font-medium w-[100px] p-1 h-max"
                        autoFocus
                    />
                ) : (
                    <p
                        className="text-sm font-sans font-medium w-max cursor-pointer"
                        onClick={() => setIsEditing(true)}
                    >
                        {reportName}
                    </p>
                )}
        </div>
        </section>
    )
}