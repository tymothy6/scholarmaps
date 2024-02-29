"use client"

import { Worker } from '@react-pdf-viewer/core';

export function PDFWorker({ children }: { children: React.ReactNode }) {
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        {children}
        </Worker>
    )
    }