import { Suspense } from 'react'
import dynamic from 'next/dynamic'

import { PaperIdentifierCarousel } from '@/components/graph/identifier-carousel'
import { CitationGraphExamples } from '@/components/graph/graph-examples'
import { PaperSeedSearch } from '@/components/graph/seed-search'
import { columns } from './citations-columns'
import { CitationResultTable } from './citations-table'
import { SearchTableSkeleton } from '../search/search-skeleton'

import { FAQButton } from '@/components/navigation/faq-button'

const CitationGraph = dynamic(() => import('@/components/graph/force-citations'), { ssr: false })

export async function generateMetadata( { searchParams }: { searchParams: {[key: string]: string | undefined } } ) {
    const title = searchParams['paperId'] ? `Map for ${searchParams['paperId']}` : 'Map';
    const description = 'Map connected papers in the Semantic Scholar research corpus';
    return { title, description };
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
        journal: string;
        authors: string[];
        publicationTypes: string[];
    }
}

interface PaperCitationResponse { total: number; offset: number; next: number; data: PaperCitationResult[]; }

async function getPaperCitations(searchPaperId: string): Promise<PaperCitationResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // development
    const queryParams = new URLSearchParams({ paperId: searchPaperId });
    const url = `${baseUrl}/api/search?${queryParams.toString()}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Citations API responded with status code ${response.status}: ${response.statusText}`)
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching citation data:', error);
        return { total: 0, offset: 0, next: 0, data: [] }; // return empty data of the same shape
    }
}

interface SearchProps { searchParams: { [key: string]: string | undefined } }

export default function Map( { searchParams }: SearchProps) {
    const searchPaperId = searchParams['paperId'] || '';

    async function PaperCitationResultsCard() {
        let results: PaperCitationResult[] = [];
        if (searchPaperId) {
            const response = await getPaperCitations(searchPaperId);
            results = response.data;
        }

        return (
            <CitationResultTable columns={columns} data={results} />
        )
    }

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

            {/* <div className="grid gap-4 w-full">
                <h2 className="text-lg lg:text-xl font-semibold mt-2">Citation graph</h2>
                <CitationGraph />
                <FAQButton />
            </div> */}
        </section>
    )
}