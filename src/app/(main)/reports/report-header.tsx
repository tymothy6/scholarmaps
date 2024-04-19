"use client"

import * as React from 'react';

import { useFlowContext, NodeData, FlowNode } from './context/flow-provider';

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
    SheetClose,
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

import PaperSearchNode from './search-node';

import { AreaChartIcon, ArrowDownUpIcon, BarChart3Icon, BookOpenIcon, ClipboardPasteIcon, CodeIcon, FileInputIcon, FilterIcon, PlusIcon, ScatterChartIcon, SparklesIcon } from 'lucide-react';

export function ReportHeader () {
    const [isEditing, setIsEditing] = React.useState(false);
    const [reportName, setReportName] = React.useState('New Report');
    const [isSheetOpen, setIsSheetOpen] = React.useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReportName(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
                e.preventDefault();
                setIsSheetOpen(!isSheetOpen);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isSheetOpen]);

    const { addNewNode, nodes, loadData, setSearchNodeIds } = useFlowContext();

    const handleAddNode = (variant: string) => {
        const newNodeData: FlowNode = {
            id: `${variant}-${nodes.length + 1}`,
            type: variant,
            data: { name: 'New node', job: 'New job', emoji: '' },
            position: { x: Math.random() * window.innerWidth / 2, y: Math.random() * window.innerHeight / 2 },
        };
        addNewNode(newNodeData);

        if (variant === 'searchNode') {
            setSearchNodeIds((prevIds) => [...prevIds, newNodeData.id]);
            setIsSheetOpen(false);
        };

        setIsSheetOpen(false);
    }

    const handleAddChatNode = () => {
        const newNodeData: FlowNode = {
            id: `${nodes.length + 1}`,
            type: 'chatNode',
            data: { messages: [] },
            position: { x: Math.random() * window.innerWidth / 2, y: Math.random() * window.innerHeight / 2 },
        };
        addNewNode(newNodeData);
        setIsSheetOpen(false);
    }

    return (
        <section className="flex items-center gap-2 w-full">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <Menubar>
        <MenubarMenu>
            <MenubarTrigger>Create</MenubarTrigger>
            <MenubarContent>
            <SheetTrigger asChild>
            <MenubarItem>
                New Block <MenubarShortcut>⌘B</MenubarShortcut>
            </MenubarItem>
            </SheetTrigger>
            <MenubarItem onSelect={() => loadData('initial')}>
                New Report <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onSelect={() => loadData('example')} >
                Example flow
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Help</MenubarItem>
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
            <TabsContent value="input" className="mt-4">
            <div className="grid gap-4">
                <Card>
                    <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-base font-hubotSans font-semibold">File</h3>
                            <p className="text-sm">Read csv, json, and pdf files</p>
                        </div>
                        <FileInputIcon className="w-5 h-5" />
                    </div>
                    </CardHeader>
                    <CardFooter className="p-4 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Output: Dataset</p>
                        <Button variant="secondary" size="icon" onClick={() => handleAddNode('jobNode')} className="rounded-full">
                            <PlusIcon className="h-5 w-5" />
                        </Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-base font-hubotSans font-semibold">Paste</h3>
                            <p className="text-sm">Paste strings, numbers, or tabular data</p>
                        </div>
                        <ClipboardPasteIcon className="w-5 h-5" />
                    </div>
                    </CardHeader>
                    <CardFooter className="p-4 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Output: Dataset, String, Number</p>
                        <Button variant="secondary" size="icon" onClick={() => handleAddNode('jobNode')} className="rounded-full">
                            <PlusIcon className="h-5 w-5" />
                        </Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-base font-hubotSans font-semibold">Semantic Scholar</h3>
                            <p className="text-sm">Load papers from Semantic Scholar</p>
                        </div>
                        <BookOpenIcon className="w-5 h-5" />
                    </div>
                    </CardHeader>
                    <CardFooter className="p-4 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Output: Dataset</p>
                        <Button variant="secondary" size="icon" onClick={() => handleAddNode('searchNode')} className="rounded-full">
                            <PlusIcon className="h-5 w-5" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            </TabsContent>
            <TabsContent value="transform" className="mt-4">
            <div className="grid gap-4">
                <Card>
                    <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-base font-hubotSans font-semibold">Summarize</h3>
                            <p className="text-sm">Summarize data sets using AI</p>
                        </div>
                        <SparklesIcon className="w-5 h-5" />
                    </div>
                    </CardHeader>
                    <CardFooter className="p-4 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Input: Dataset, Output: Dataset</p>
                        <Button variant="secondary" size="icon" onClick={handleAddChatNode} className="rounded-full">
                            <PlusIcon className="h-5 w-5" />
                        </Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-base font-hubotSans font-semibold">Filter</h3>
                            <p className="text-sm">Parse data sets based on a given column</p>
                        </div>
                        <FilterIcon className="w-5 h-5" />
                    </div>
                    </CardHeader>
                    <CardFooter className="p-4">
                        <p className="text-sm text-muted-foreground">Input: Dataset, Output: Dataset</p>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-base font-hubotSans font-semibold">Sort</h3>
                            <p className="text-sm">Sort data sets based on a given column</p>
                        </div>
                        <ArrowDownUpIcon className="w-5 h-5" />
                    </div>
                    </CardHeader>
                    <CardFooter className="p-4">
                        <p className="text-sm text-muted-foreground">Input: Dataset, Output: Dataset</p>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-base font-hubotSans font-semibold">Code</h3>
                            <p className="text-sm">Analyze data your way with JavaScript or Python</p>
                        </div>
                        <CodeIcon className="w-5 h-5" />
                    </div>
                    </CardHeader>
                    <CardFooter className="p-4">
                        <p className="text-sm text-muted-foreground">Input: Dataset, Output: Terminal</p>
                    </CardFooter>
                </Card>
            </div>
            </TabsContent>
            <TabsContent value="visualize" className="mt-4">
            <div className="grid gap-4">
                <Card>
                    <CardHeader className="p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-base font-hubotSans font-semibold">Bar</h3>
                                <p className="text-sm">Plot values from one column on a bar graph</p>
                            </div>
                            <BarChart3Icon className="w-5 h-5" />
                        </div>
                    </CardHeader>
                    <CardFooter className="p-4">
                        <p className="text-sm text-muted-foreground">Input: Dataset, Output: Graph</p>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-base font-hubotSans font-semibold">Scatterplot</h3>
                                <p className="text-sm">Plot values from two columns against each other</p>
                            </div>
                            <ScatterChartIcon className="w-5 h-5" />
                        </div>
                    </CardHeader>
                    <CardFooter className="p-4">
                        <p className="text-sm text-muted-foreground">Input: Dataset, Output: Graph</p>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-base font-hubotSans font-semibold">Areachart</h3>
                                <p className="text-sm">Plot values from two columns against each other</p>
                            </div>
                            <AreaChartIcon className="w-5 h-5" />
                        </div>
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
            <SheetClose asChild>
                <Button type="button">Close</Button>
            </SheetClose>
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