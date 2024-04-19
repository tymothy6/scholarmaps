"use client"

import * as React from 'react';

import { type SearchPaperResult } from './tables/reports-search-columns';

import { Handle, Position } from 'reactflow';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogContent,
    DialogTrigger,
    DialogFooter,
    DialogClose,
    DialogDescription
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { InfoIcon } from 'lucide-react';

function PaperResultNode ({ data }: { data: SearchPaperResult }) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="shadow-md bg-background border-y p-4 flex flex-col items-center max-w-md nowheel">
            <div className="space-y-2">
                    <div className="flex gap-2 items-start">
                        <h4 className="text-sm font-semibold">{data.title}</h4>
                    </div>
                    <div className="flex gap-2 items-center">
                        <p className="text-sm font-medium text-muted-foreground">{data.journal.name}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center justify-start">
                    {data.isOpenAccess && (
                        <a href={data.openAccessPdf?.url} rel="noreferrer" target="_blank">
                            <Badge variant="default" className="font-hubotSans">Open access</Badge>
                        </a>
                    )}
                    {data.publicationTypes && data.publicationTypes.map((publicationType) => (
                        <Badge key={publicationType} variant="secondary" className="font-hubotSans">
                            {publicationType.replace(/([A-Z])/g, ' $1').trim()}
                        </Badge>
                    ))}
                    </div>
                    <Textarea className="text-sm mb-2 min-h-[90px]">
                        {data.tldr ? data.tldr.text : 'No tl;dr available :('}
                    </Textarea>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                <InfoIcon className="h-4 w-4 mr-2" />
                                Abstract
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] sm:max-h-[550px]">
                        <DialogHeader>
                            <DialogTitle>{data.title}</DialogTitle>
                            <ScrollArea className="w-full max-h-[100px]">
                                <DialogDescription className="text-popover-foreground">{data.authors.map(author => author.name).join(", ")}</DialogDescription>
                            </ScrollArea>
                            {data.isOpenAccess && (
                                <a href={data.openAccessPdf?.url} rel="noreferrer" target="_blank">
                                    <Badge variant="default" className="font-hubotSans">Open access</Badge>
                                </a>
                            )}
                        </DialogHeader>
                        <ScrollArea className="w-full max-h-[300px]">
                        <DialogDescription>
                            {data.abstract}
                        </DialogDescription>
                        </ScrollArea>
                        <DialogFooter className="sm:justify-end">
                            <DialogClose asChild>
                                <Button variant="secondary">Close</Button>
                            </DialogClose>
                            <Button variant="default" asChild>
                                <a href={data.url} target="_blank" rel="noopener noreferrer">View source</a>
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                    </Dialog>
            </div>

            <Handle 
                type="target" 
                position={Position.Left} 
                className="!bg-primary/50 hover:!bg-primary !h-full !w-2 !rounded-none !rounded-tl-lg !rounded-bl-lg !border-0"
            />
            <Handle 
                type="source" 
                position={Position.Right} 
                className="!bg-primary/50 hover:!bg-primary !h-full !w-2 !rounded-none !rounded-tr-lg !rounded-br-lg !border-0"
            />
        </div>
    )
}

export default React.memo(PaperResultNode);
