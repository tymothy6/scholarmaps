"use client"

import * as React from 'react';

import { Row } from '@tanstack/react-table';

import { DashboardPaperResult } from './dashboard-fetch-columns';

import { useMediaQuery } from '@/lib/use-media-query';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
  } from '@/components/ui/dialog';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from '@/components/ui/drawer';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

import { InfoIcon, MoreHorizontalIcon } from 'lucide-react';

export function AbstractCell( { row }: { row: Row<DashboardPaperResult> }) {
    const abstract = row.getValue("abstract");
        const [open, setOpen] = React.useState(false);
        const isDesktop = useMediaQuery("(min-width: 768px)");

        if (isDesktop) {
            return (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <InfoIcon className="h-4 w-4 mr-2" />
                            <span className="sm:block">Abstract</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Details</DialogTitle>
                            <DialogDescription>{typeof abstract === 'string' ? abstract : 'Failed to load abstract'}</DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-end">
                            <DialogClose asChild>
                                <Button variant="secondary">Close</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )
        }

        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button variant="outline">
                        <InfoIcon className="h-4 w-4" />
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Details</DrawerTitle>
                        <DrawerDescription>{typeof abstract === 'string' ? abstract : 'Failed to load abstract'}</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="secondary">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
}

export function ActionsCell( { row }: { row: Row<DashboardPaperResult> }) {
    async function copyToClipboard(text: string) {
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    }

    const result = row.original

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <span className="sr-only">Open row options</span>
                        <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => copyToClipboard(result.paperId)}
                    >
                        Copy S2 ID
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => alert(`Editing ${result.title}`)}>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => alert(`Sharing ${result.title}`)}>
                        Share
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => alert(`Deleting ${result.title}`)}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
}