"use client"

import * as React from 'react';

import { type SearchPaperResult } from './tables/reports-search-columns';

import { Handle, Position } from 'reactflow';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogTrigger,
    DialogDescription
} from '@/components/ui/dialog';

function PaperResultNode ({ data }: { data: SearchPaperResult }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchResults, setSearchResults] = React.useState<SearchPaperResult[]>([]);

    return (
        <div className="shadow-md bg-background border-y p-4 flex flex-col items-center max-w-md">
            <div className="space-y-2">
                    <div className="flex gap-2 items-start">
                        <h4 className="text-sm font-semibold">{data.title}</h4>
                    </div>
                    <div className="flex gap-2 items-center">
                        <p className="text-sm text-muted-foreground">{data.journal.name}</p>
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
                    {data.tldr.text ? <Badge variant="default" className="mr-2 font-hubotSans">tl;dr</Badge> : <div /> }
                    <p className="text-sm mb-2">
                        {data.tldr ? data.tldr.text : 'No tl;dr available :('}
                    </p>
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
