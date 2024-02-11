import { Suspense } from 'react'
import dynamic from 'next/dynamic'

import { SearchTableSkeleton } from '../../search/search-skeleton'
import { columns } from './citations-columns'
import { CitationResultTable } from './citations-table'
import { FAQButton } from '@/components/navigation/faq-button'
import { PaperCitationResult } from '../page'
import { getPaperCitations } from '../page'

const CitationGraph = dynamic(() => import('@/components/graph/force-citations'), { ssr: false })


export function generateMetadata( { searchParams }: { searchParams: {[key: string]: string | undefined } } ) {
    const title = searchParams['paperId'] ? `Map for ${searchParams['paperId']}` : 'Map';
    const description = 'Map connected papers in the Semantic Scholar research corpus';
    return { title, description };
}

interface SearchProps { searchParams: { [key: string]: string | undefined } }

export default async function Results({ searchParams }: SearchProps ) {
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
}