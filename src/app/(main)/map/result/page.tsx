import { Suspense } from 'react'
import dynamic from 'next/dynamic'

import { SearchTableSkeleton } from '../../search/search-skeleton'
import { columns } from './citations-columns'
import { CitationResultTable } from './citations-table'
import { FAQButton } from '@/components/navigation/faq-button'
import { PaperCitationResult, getPaperCitations } from '../page'

const CitationGraph = dynamic(() => import('@/components/graph/force-citations'), { ssr: false })


export function generateMetadata( { searchParams }: { searchParams: {[key: string]: string | undefined } } ) {
    const title = searchParams['paperId'] ? `Map for ${searchParams['paperId']}` : 'Map results';
    const description = 'Map connected papers in the Semantic Scholar research corpus';
    return { title, description };
}

interface SearchProps { searchParams: { [key: string]: string | undefined } }

export default async function Results({ searchParams }: SearchProps ) {
    const paperId = searchParams['paperId'] || '';

    async function PaperCitationResultsCard() { 
        let results: PaperCitationResult[] = [];
        if (paperId) {
            const response = await getPaperCitations(paperId);
            results = response.data;
        }

        return (
            <CitationResultTable columns={columns} data={results} />
        )
    }

    return (
        <section className="p-4 absolute top-16 lg:left-[16.666%] lg:p-8 flex flex-col gap-2 w-full lg:w-5/6">
            <h1 className="mt-2 lg:mt-0 text-xl lg:text-2xl font-semibold lg:font-bold mb-2">Map results</h1>
            <div className="w-full">
                <Suspense fallback={<SearchTableSkeleton />}>
                    <PaperCitationResultsCard />
                </Suspense>
            </div>
        </section>
    )
}