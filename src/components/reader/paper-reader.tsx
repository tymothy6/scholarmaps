"use client"

import * as React from 'react';
import { Document, Page } from 'react-pdf';

export function PaperReader({ file }: { file: string }) {
    const [numPages, setNumPages] = React.useState<number | null>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <Document 
        file={file}>
            <Page pageNumber={1} />
        </Document>
    )
}