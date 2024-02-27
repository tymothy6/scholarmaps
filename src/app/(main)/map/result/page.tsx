import { Suspense } from 'react'
import dynamic from 'next/dynamic'

import { CitationGraphSkeleton, SearchTableSkeleton } from '../../search/search-skeleton'
import { columns } from './citations-columns'
import { CitationResultTable } from './citations-table'
import { FAQButton } from '@/components/navigation/faq-button'
import { PaperCitationResult, getAllPaperCitations, getInfluentialPaperCitations } from '../page'
import { CitationGraphData } from '@/components/graph/force-citations'

const CitationGraph = dynamic(() => import('@/components/graph/force-citations'), { ssr: false })

export function generateMetadata( { searchParams, seedPaperData }: { searchParams: {[key: string]: string | undefined }, seedPaperData: SeedPaperData} ) {
    const title = searchParams['paperId'] ? `Map for ${searchParams['paperId']}` : 'Map results';
    const description = 'Map connected papers in the Semantic Scholar research corpus';
    return { title, description };
}

interface SearchProps { searchParams: { [key: string]: string | undefined } }

export type SeedPaperData = {
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

export default async function Results({ searchParams }: SearchProps ) {
    const paperId = searchParams['paperId'] || '';

    let results: PaperCitationResult[] = [];

    if (paperId) {
        const response = await getInfluentialPaperCitations(paperId);
        results = response.data;
    }

    // Fetch data for the seed paper using details API
    async function getSeedPaperData(): Promise<SeedPaperData> {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
            const url = `${baseUrl}/api/details?paperId=${paperId}`;
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching seed paper data:', error);
            return {
                paperId: paperId,
                url: 'https://www.semanticscholar.org/',
                title: 'Seed paper',
                year: 2024,
                referenceCount: 0,
                citationCount: 0,
                influentialCitationCount: 0,
                journal: {
                    name: 'No journal found',
                },
                authors: [],
                publicationTypes: [],
            };
        }
    }

    const seedPaperResponse = await getSeedPaperData();
    // console.log('Seed paper data:', seedPaperData); // log for debugging

    // Fetch citations and transform into shape that matches react-force-graph
    async function getCitationGraphData(): Promise<CitationGraphData> {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const url = `${baseUrl}/api/graph`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ citations: results, seedPaperData: seedPaperResponse }),
            });

            if (!response.ok) {
                throw new Error(`Graph API responded with status code ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error transforming citation data:', error);
            return { 
                nodes: [
                { 
                    id: paperId, 
                    name: 'Seed paper', 
                    val: 0, 
                    val2: 0, 
                    val3: 2024, 
                    val4: 0, 
                    val5: "Journal Article", 
                    val6: "No journal found",
                    val7: "https://www.semanticscholar.org/"
                },
                ], 
                links: [] ,
                totalCitations: 0,
                minReferenceCount: 0,
                maxReferenceCount: 0,
                minCitationCount: 0,
                maxCitationCount: 0,
            };
        }
    }

    async function PaperCitationResultsGraph() {
        // Alternative for memoization to avoid fetching graph data on re-render?
        const graphData = await getCitationGraphData();
        // console.log(JSON.stringify(graphData, null, 2)); // log for debugging

        return (
            <CitationGraph graphData={graphData} seedPaperId={seedPaperResponse.paperId} />
        )
    }

    async function PaperCitationResultsCard() { 
        return (
            <CitationResultTable columns={columns} data={results} />
        )
    }

    return (
        <section className="p-4 absolute top-16 lg:left-[16.666%] lg:p-8 flex flex-col gap-2 w-full lg:w-5/6">
            <h1 className="mt-2 lg:mt-0 text-xl lg:text-2xl font-semibold lg:font-bold mb-2">Map results</h1>
            <div className="relative w-full mb-4">
                <Suspense fallback={<CitationGraphSkeleton />}>
                    <PaperCitationResultsGraph />
                    <FAQButton />
                </Suspense>
            </div>
            <div className="w-full">
                <Suspense fallback={<SearchTableSkeleton />}>
                    <PaperCitationResultsCard />
                </Suspense>
            </div>
        </section>
    )
}