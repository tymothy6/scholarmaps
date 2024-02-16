import { Suspense } from 'react'
import dynamic from 'next/dynamic'

import { SearchTableSkeleton } from '../../search/search-skeleton'
import { columns } from './citations-columns'
import { CitationResultTable } from './citations-table'
import { FAQButton } from '@/components/navigation/faq-button'
import { PaperCitationResult, getAllPaperCitations, getInfluentialPaperCitations } from '../page'
import { CitationGraphData } from '@/components/graph/force-citations'

const CitationGraph = dynamic(() => import('@/components/graph/force-citations'), { ssr: false })


export function generateMetadata( { searchParams }: { searchParams: {[key: string]: string | undefined } } ) {
    const title = searchParams['paperId'] ? `Map for ${searchParams['paperId']}` : 'Map results';
    const description = 'Map connected papers in the Semantic Scholar research corpus';
    return { title, description };
}

interface SearchProps { searchParams: { [key: string]: string | undefined } }

export default async function Results({ searchParams }: SearchProps ) {
    const paperId = searchParams['paperId'] || '';

    async function getCitationGraphData(paperId: string): Promise<CitationGraphData> {
        let results: PaperCitationResult[] = [];
        if (paperId) {
            const response = await getInfluentialPaperCitations(paperId);
            results = response.data;
        }

        try {
            const response = await fetch('/api/graph', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ citations: results, originatingPaperId: paperId }),
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
                { id: paperId, name: 'Seed paper', val: 10 },
                ], 
                links: [] 
            };
        }
    }

    async function PaperCitationResultsGraph() {
        const graphData = await getCitationGraphData(paperId);

        return (
            <CitationGraph graphData={graphData} />
        )
    }

    async function PaperCitationResultsCard() { 
        let results: PaperCitationResult[] = [];
        if (paperId) {
            const response = await getInfluentialPaperCitations(paperId);
            results = response.data;
        }

        return (
            <CitationResultTable columns={columns} data={results} />
        )
    }

    return (
        <section className="p-4 absolute top-16 lg:left-[16.666%] lg:p-8 flex flex-col gap-2 w-full lg:w-5/6">
            <h1 className="mt-2 lg:mt-0 text-xl lg:text-2xl font-semibold lg:font-bold mb-2">Map results</h1>
            <div className="relative w-full mb-4">
                <PaperCitationResultsGraph />
                <FAQButton />
            </div>
            <div className="w-full">
                <Suspense fallback={<SearchTableSkeleton />}>
                    <PaperCitationResultsCard />
                </Suspense>
            </div>
        </section>
    )
}