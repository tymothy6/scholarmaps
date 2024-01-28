import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import { Card } from '@/components/ui/card'

import { Sidebar } from '@/components/navigation/sidebar'
import { PageHeader } from '@/components/navigation/header'

import { SearchPaperResult, columns } from './search-columns'
import { SearchResultTable } from './search-table'

async function getSearchResults(searchQuery: string): Promise<SearchPaperResult[]> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const queryParams = new URLSearchParams({ query: searchQuery });
    const url = `${baseUrl}/api/search?${queryParams.toString()}`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(response.statusText)
    }

    const data = await response.json()
    return data
}

export default async function Search( request: NextRequest ) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const fullUrl = new URL(request.url, baseUrl);

    const searchQuery = fullUrl.searchParams.get('query') || '';
    let data: SearchPaperResult[] = [];

    if (searchQuery) {
        data = await getSearchResults(searchQuery);
    }
    
    return (
        <main className="flex flex-col gap-2">
            <Sidebar />
            <PageHeader />
            <section className="p-4 absolute top-16 lg:left-[16.666%] lg:p-8 flex flex-col gap-2 w-full lg:w-5/6">
                <h1 className="text-2xl font-semibold lg:font-bold mb-2">Search</h1>
                <div className="grid gap-4">
                <Card>
                    <SearchResultTable columns={columns} data={data} />
                </Card>
                </div>
            </section>
        </main>
    )
}