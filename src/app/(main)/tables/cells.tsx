"use client"

import * as React from 'react';

import { Row } from '@tanstack/react-table';

import { type BookmarkedPaper } from './dashboard-fetch-columns';

import { useMediaQuery } from '@/lib/use-media-query';

import { Badge } from '@/components/ui/badge';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

import { InfoIcon, MoreHorizontalIcon, NavigationIcon, Link2Icon, BookmarkPlusIcon, XIcon, FileSearchIcon, Delete } from 'lucide-react';

export function AbstractCell( { row }: { row: Row<BookmarkedPaper> }) {
    const abstract = row.getValue("abstract");
    const title = row.getValue("title");
    const authors = row.getValue("authors");
    const result = row.original;

    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop && Array.isArray(authors)) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="ml-3">
                        <span className="sr-only">View abstract</span>
                        <InfoIcon className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] sm:max-h-[550px]">
                    <DialogHeader>
                        <DialogTitle>{typeof title === 'string' ? title : 'N/A'}</DialogTitle>
                        <ScrollArea className="w-full max-h-[100px]">
                            <DialogDescription className="text-popover-foreground">{authors.map(author => author.name).join(", ")}</DialogDescription>
                        </ScrollArea>
                        {result.isOpenAccess && (
                            <a href={result.openAccessPdf?.url} rel="noreferrer" target="_blank">
                                <Badge variant="default" className="font-hubotSans">Open access</Badge>
                            </a>
                        )}
                    </DialogHeader>
                    <ScrollArea className="w-full max-h-[300px]">
                    <DialogDescription>
                        {typeof abstract === 'string' ? abstract : '🥹 Abstract not available from Semantic Scholar API.'}
                    </DialogDescription>
                    </ScrollArea>
                    <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                            <Button variant="secondary">Close</Button>
                        </DialogClose>
                        <Button variant="default" asChild>
                            <a href={result.url} target="_blank" rel="noopener noreferrer">View source</a>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="flex">
                    <InfoIcon className="h-4 w-4" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="flex flex-col">
                <DrawerHeader>
                    <DrawerTitle className="text-left">{typeof title === 'string' ? title : 'N/A'}</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 max-h-[50vh] overflow-y-scroll">
                <DrawerDescription>{typeof abstract === 'string' ? abstract : 'Failed to load abstract from Semantic Scholar.'}</DrawerDescription>
                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="secondary">Close</Button>
                    </DrawerClose>
                    <Button variant="default" asChild>
                            <a href={result.url} target="_blank" rel="noopener noreferrer">View source</a>
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export function ActionsCell( { row }: { row: Row<BookmarkedPaper> }) {
    async function copyToClipboard(text: string) {
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    const handleDelete = async (paperId: string) => {
        try {
          const response = await fetch('/api/bookmarks/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paperId }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to delete bookmark');
          }
    
          toast.success('Bookmark deleted successfully');
        } catch (error) {
          console.error('Error deleting bookmark:', error);
          toast.error('Failed to delete bookmark');
        }
    };

    const result = row.original;

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
                        onClick={() => {
                            if (result.paperId) {
                                window.open(`/map/result?paperId=${result.paperId}`, '_blank');
                            }
                        }}
                    >
                        <NavigationIcon className="mr-2 h-4 w-4" />
                        Map citations
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => copyToClipboard(result.paperId)}
                    >
                        <FileSearchIcon className="mr-2 h-4 w-4" />
                        Copy paper ID
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        onClick={() => copyToClipboard(result.url)}
                    >
                        <Link2Icon className="mr-2 h-4 w-4" />
                        Copy paper URL
                    </DropdownMenuItem>
                    { result.bookmarked && 
                    <DropdownMenuItem 
                        onClick={() => handleDelete(result.paperId)}
                    >
                        <Delete className="mr-2 h-4 w-4 text-destructive" />
                        <span className="text-destructive">Remove bookmark</span>
                    </DropdownMenuItem>
                    }
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => alert(`Deleting ${result.title}`)}>
                        <XIcon className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
}