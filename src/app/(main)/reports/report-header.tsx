"use client"

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { 
    Card,
    CardHeader,
    CardFooter,
 } from '@/components/ui/card';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
 } from "@/components/ui/sheet"
import { Input } from '@/components/ui/input';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
 } from '@/components/ui/menubar';
import { Separator } from '@/components/ui/separator';
import {
    Tabs,
    TabsContent,
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
        <Sheet>
        <Menubar>
        <MenubarMenu>
            <MenubarTrigger>Create</MenubarTrigger>
            <MenubarContent>
            <SheetTrigger asChild>
            <MenubarItem>
                New Block <MenubarShortcut>⌘B</MenubarShortcut>
            </MenubarItem>
            </SheetTrigger>
            <MenubarItem>
                New Report <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Help</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Results</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
            <MenubarItem>
                Chart 
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>New View</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
            <MenubarTrigger>Share</MenubarTrigger>
            <MenubarContent>
            <MenubarSub>
                <MenubarSubTrigger>Team</MenubarSubTrigger>
                <MenubarSubContent>
                <MenubarItem>Email</MenubarItem>
                <MenubarItem>Messages</MenubarItem>
                <MenubarItem>Notes</MenubarItem>
                </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Export</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
        </Menubar>
        <SheetContent side="left">
            <SheetHeader>
                <SheetTitle>Block Library</SheetTitle>
            </SheetHeader>
        <SheetDescription className="mt-4">
        <Tabs defaultValue="input">
            <TabsList>
                <TabsTrigger value="input">Input</TabsTrigger>
                <TabsTrigger value="transform">Transform</TabsTrigger>
                <TabsTrigger value="visualize">Visualize</TabsTrigger>
            </TabsList>
            <TabsContent value="input">
            <div className="grid gap-4">
                <Card>
                    <CardHeader className="p-4">
                        <h3 className="text-base font-hubotSans font-semibold">File</h3>
                        <p className="text-sm">Read csv, json, and pdf files</p>
                    </CardHeader>
                    <CardFooter className="p-4">
                        <p className="text-sm text-muted-foreground">Output: Dataset</p>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="p-4">
                        <h3 className="text-base font-hubotSans font-semibold">Paste</h3>
                        <p className="text-sm">Paste input strings, numbers, or csv files</p>
                    </CardHeader>
                    <CardFooter className="p-4">
                        <p className="text-sm text-muted-foreground">Output: Dataset, Object, String, Number</p>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="p-4">
                        <h3 className="text-base font-hubotSans font-semibold">Semantic Scholar</h3>
                        <p className="text-sm">Load papers from Semantic Scholar</p>
                    </CardHeader>
                    <CardFooter className="p-4">
                        <p className="text-sm text-muted-foreground">Output: Dataset</p>
                    </CardFooter>
                </Card>
            </div>
            </TabsContent>
            <TabsContent value="transform">
            <div className="grid gap-4">
                <Card>
                    <CardHeader className="p-4">
                        <h3 className="text-base font-hubotSans font-semibold">Filter</h3>
                        <p className="text-sm">Parse data sets based on a given column</p>
                    </CardHeader>
                    <CardFooter className="p-4">
                        <p className="text-sm text-muted-foreground">Input: Dataset, Output: Dataset</p>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="p-4">
                        <h3 className="text-base font-hubotSans font-semibold">Sort</h3>
                        <p className="text-sm">Sort data sets based on a given column</p>
                    </CardHeader>
                    <CardFooter className="p-4">
                        <p className="text-sm text-muted-foreground">Input: Dataset, Output: Dataset</p>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="p-4">
                        <h3 className="text-base font-hubotSans font-semibold">Code</h3>
                        <p className="text-sm">Do (almost) anything you want with JavaScript or Python 🧑🏼‍💻</p>
                    </CardHeader>
                    <CardFooter className="p-4">
                        <p className="text-sm text-muted-foreground">Input: Dataset, Output: Terminal</p>
                    </CardFooter>
                </Card>
            </div>
            </TabsContent>
            <TabsContent value="visualize">
            <div className="grid gap-4">
                <Card>
                    <CardHeader className="p-4">
                        <h3 className="text-base font-hubotSans font-semibold">Bar</h3>
                        <p className="text-sm">Plot a bar graph</p>
                    </CardHeader>
                    <CardFooter className="p-4">
                        <p className="text-sm text-muted-foreground">Input: Dataset, Output: Graph</p>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="p-4">
                        <h3 className="text-base font-hubotSans font-semibold">Scatterplot</h3>
                        <p className="text-sm">Plot values against each other</p>
                    </CardHeader>
                    <CardFooter className="p-4">
                        <p className="text-sm text-muted-foreground">Input: Dataset, Output: Graph</p>
                    </CardFooter>
                </Card>
            </div>
            </TabsContent>
        </Tabs>
        </SheetDescription>
        <SheetFooter className="mt-4">
            <Button type="submit">Close</Button>
        </SheetFooter>
        </SheetContent>
        </Sheet>
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