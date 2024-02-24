import { Suspense } from 'react'
import dynamic from 'next/dynamic'

import { CitationGraphSkeleton, SearchTableSkeleton } from '../../search/search-skeleton'
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

// async function getSeedPaperData (searchParams: { [key: string]: string | undefined }) {
//     const paperId = searchParams['paperId'] || '';
//     let results: PaperCitationResult[] = [];
//     if (paperId) {
//         const response = await getInfluentialPaperCitations(paperId);
//         results = response.data;
//     }
//     return results;
// }

export default async function Results({ searchParams }: SearchProps ) {
    const paperId = searchParams['paperId'] || '';

    let results: PaperCitationResult[] = [];
        if (paperId) {
            const response = await getInfluentialPaperCitations(paperId);
            results = response.data;
        }

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
                { 
                    id: paperId, 
                    name: 'Seed paper', 
                    val: 10, 
                    val2: 2024, 
                    val3: 0, 
                    val4: 0, 
                    val5: ["Journal Article"], 
                    val6: "Journal", },
                ], 
                links: [] ,
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
            <CitationGraph graphData={graphData} originatingPaperId={paperId} />
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
                    <div className="absolute bottom-4 left-4">
                        <p className="text-xs text-muted-foreground">Scroll to zoom | ⌘ click to pan or drag</p>
                    </div>
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