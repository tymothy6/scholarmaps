"use client"

import * as React from 'react';

import Link from 'next/link';

import { Row } from '@tanstack/react-table';

import { SearchPaperResult, isJournalObject, isTldrObject } from './search-columns';

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
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
 } from '@/components/ui/hover-card';
import { 
    Popover,
    PopoverContent,
    PopoverTrigger,
 } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

import { BookmarkIcon, InfoIcon, MoreHorizontalIcon, NavigationIcon, Link2Icon, BookmarkPlusIcon, XIcon, FileSearchIcon, Delete } from 'lucide-react';

async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
}

export function TitleCell ({ row }: { row: Row<SearchPaperResult> }) {
    const result = row.original;
        const title = row.getValue("title");
        const journal = row.getValue("journal");
        const authors = row.getValue("authors");
        const abstract = row.getValue("abstract");

        const [open, setOpen] = React.useState(false);
        const isDesktop = useMediaQuery("(min-width: 768px)");

        if (isDesktop) {
            return (
                <div className="pl-0 pr-2 py-2 relative">
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Button variant="link" className="w-max whitespace-normal h-max focus-visible:ring-0" asChild>
                                <Link href={`/search/result?paperId=${result.paperId}`}>
                                <span className="w-72 text-left">{typeof title === 'string' ? title : 'N/A'}</span>
                                </Link>
                            </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-40 lg:w-80">
                            <div className="space-y-2">
                                <div className="flex gap-2 items-start">
                                    <h4 className="text-sm font-semibold">{typeof title === 'string' ? title : 'N/A'}</h4>
                                    {isTldrObject(result.tldr) && result.tldr.text ? <Badge variant="default" className="mr-2 font-hubotSans">tl;dr</Badge> : <div /> }
                                </div>
                                <div className="flex flex-wrap gap-2 items-center justify-start">
                                {result.isOpenAccess && (
                                    <a href={result.openAccessPdf?.url} rel="noreferrer" target="_blank">
                                        <Badge variant="default" className="font-hubotSans">Open access</Badge>
                                    </a>
                                )}
                                {result.publicationTypes && result.publicationTypes.map((publicationType, index) => (
                                    <Badge key={publicationType} variant="secondary" className="font-hubotSans">
                                    {publicationType.replace(/([A-Z])/g, ' $1').trim()}
                                    </Badge>
                                ))}
                                </div>
                                <p className="text-sm mb-2">
                                    {isTldrObject(result.tldr) ? result.tldr.text : 'No tl;dr available :('}
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                    { result.bookmarked && <BookmarkIcon className="h-4 w-4 absolute top-2 right-0" /> }
                </div>
            )
        }

        if (Array.isArray(authors)) {
            return (
                <div className="pl-0 pr-2 py-0">
                    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground>
                    <DrawerTrigger asChild>
                        <Button variant="link" className="w-56 h-max whitespace-normal justify-start focus-visible:ring-0">
                        <span className="text-left">{typeof title === 'string' ? title : 'N/A'}</span>
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className="flex flex-col max-h-[90%]">
                        <DrawerHeader>
                            <DrawerTitle className="text-left">{typeof title === 'string' ? title : 'N/A'}</DrawerTitle>
                            <p className="text-left text-sm">
                                {authors.map(author => author.name).join(", ")}
                            </p>
                            <p className="text-left text-sm font-medium">
                                {isJournalObject(journal) ? journal.name : 'N/A'} ({typeof result.year === 'number' ? result.year : 'N/A'})
                            </p>
                            <div className="flex flex-wrap gap-2 items-center justify-start">
                                {result.publicationTypes && result.publicationTypes.map((publicationType, index) => (
                                    <Badge key={publicationType} variant="secondary" className="font-hubotSans">
                                    {publicationType.replace(/([A-Z])/g, ' $1').trim()}
                                    </Badge>
                                ))}
                            </div>
                        </DrawerHeader>
                        <div className="flex flex-col gap-2 px-4 items-start w-full">
                        <Popover>
                            <PopoverTrigger><Badge variant="default" className="mr-2 w-max font-hubotSans">tl;dr</Badge>
                            </PopoverTrigger>
                            <PopoverContent side="right" className="max-w-[200px] p-2 bg-primary text-primary-foreground border-primary">
                                <p className="text-sm">TLDRs (too long; didn&apos;t read) are short summaries generated by the <a href="https://arxiv.org/abs/2004.15011" target="_blank" rel="noopener noreferrer" className="underline-offset-2 underline font-medium">SciTLDR</a> model.</p></PopoverContent>
                        </Popover>
                        <DrawerDescription>{isTldrObject(result.tldr) ? result.tldr.text : 'No tl;dr available :('}</DrawerDescription>
                        </div>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button variant="secondary">Close</Button>
                            </DrawerClose>
                            <Drawer nested={true}>
                            <DrawerTrigger asChild>
                                <Button variant="default">
                                    View abstract
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent className="flex flex-col">
                                <DrawerHeader>
                                    <DrawerTitle className="text-left">{typeof title === 'string' ? title : 'N/A'}</DrawerTitle>
                                </DrawerHeader>
                                <div className="px-4 max-h-[50vh] overflow-y-scroll">
                                <DrawerDescription>{typeof abstract === 'string' ? abstract : '🥹 Abstract not available from Semantic Scholar API.'}</DrawerDescription>
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
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
                </div>
            )
        }
}

export function AbstractCell ({ row }: { row: Row<SearchPaperResult> }) {
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

export function ActionsCell ({ row }: { row: Row<SearchPaperResult> }) {
    const result = row.original;

    const handleCreate = async (paperId: string) => {
        try {
          const response = await fetch('/api/bookmarks/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paperId }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to create bookmark');
          }
    
          toast.message('Bookmark created successfully');
        } catch (error) {
          console.error('Error creating bookmark:', error);
          toast.error('Failed to create bookmark');
        }
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
    
          toast.message('Bookmark deleted successfully');
        } catch (error) {
          console.error('Error deleting bookmark:', error);
          toast.error('Failed to delete bookmark');
        }
      };
    

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
                    { result.bookmarked === false && 
                    <DropdownMenuItem 
                        onClick={() => handleCreate(result.paperId)}
                    >
                        <BookmarkPlusIcon className="mr-2 h-4 w-4" />
                        Bookmark
                    </DropdownMenuItem>
                    }
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
