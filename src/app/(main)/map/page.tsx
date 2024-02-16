import { Metadata } from 'next'

import { PaperIdentifierCarousel } from '@/components/graph/identifier-carousel'
import { CitationGraphExamples } from '@/components/graph/graph-examples'
import { PaperSeedSearch } from '@/components/graph/seed-search'

export const metadata: Metadata = {
    title: "Map",
    description: "Map connected papers in the Semantic Scholar research corpus",
}

export type PaperCitationResult = {
    contexts: string[];
    intents: string[];
    contextsWithIntent: [{ 
        context: string; 
        intents: string[]; 
    }];
    isInfluential: boolean;
    citingPaper: { 
        paperId: string;
        url: string;
        title: string;
        year: number;
        referenceCount: number;
        citationCount: number;
        influentialCitationCount: number;
        journal: {
            name: string;
            pages?: string;
            volume?: string;
        }
        authors: Array<{
            authorId: string
            name: string
        }>
        publicationTypes: string[];
    }
}

export interface PaperCitationResponse { total: number; offset: number; next: number; data: PaperCitationResult[]; }

export async function getAllPaperCitations(searchPaperId: string): Promise<PaperCitationResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const queryParams = new URLSearchParams({ paperId: searchPaperId });
    const url = `${baseUrl}/api/citations?${queryParams.toString()}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Citations API responded with status code ${response.status}: ${response.statusText}`)
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching citation data:', error);
        return { total: 0, offset: 0, next: 0, data: [] }; 
    }
}

export async function getInfluentialPaperCitations(searchPaperId: string): Promise<PaperCitationResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; 
    const queryParams = new URLSearchParams({ paperId: searchPaperId });
    const url = `${baseUrl}/api/citations?${queryParams.toString()}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Citations API responded with status code ${response.status}: ${response.statusText}`)
        }

        const data = await response.json();

        const filteredData = data.filter((item: PaperCitationResult) => item.isInfluential);

        const updatedTotal = filteredData.length;

        return {
            ...data,
            total: updatedTotal, 
            data: filteredData,
        };


    } catch (error) {
        console.error('Error fetching citation data:', error);
        return { total: 0, offset: 0, next: 0, data: [] }; // return empty data of the same shape
    }
}

interface SearchProps { searchParams: { [key: string]: string | undefined } }

export default function Map( { searchParams }: SearchProps) {
    return (
        <section className="p-4 absolute top-16 lg:left-[16.666%] lg:p-8 flex flex-col gap-2 w-full lg:w-5/6">
            <h1 className="mt-2 lg:mt-0 text-xl lg:text-2xl font-semibold lg:font-bold mb-2">Map connected papers</h1>
            <div className="flex flex-col space-y-8 items-center mx-auto">
                <div className="flex flex-col space-y-4 items-center w-full md:mx-auto">
                    <h2 className="text-base md:text-lg font-semibold">To get started, enter a paper identifier</h2>
                    <PaperSeedSearch />
                </div>
                <PaperIdentifierCarousel />
                <CitationGraphExamples />
            </div>
        </section>
    )
}