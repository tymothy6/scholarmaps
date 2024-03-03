"use client"

import * as React from 'react';

import { pdfjs, Document, Page } from 'react-pdf';

export function PaperReader({ source }: { source: string }) {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`;

    const [numPages, setNumPages] = React.useState<number | null>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <embed
            type='application/pdf'
            src={source}
            className="w-full h-[600px] lg:h-[800px] rounded-lg border"
        />
        // <Document 
        // file={source}
        // onLoadSuccess={onDocumentLoadSuccess}
        // >
        //     <Page pageNumber={1} />
        // </Document>
    )
}