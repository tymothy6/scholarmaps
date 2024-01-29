import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import { Card } from '@/components/ui/card'

import { Sidebar } from '@/components/navigation/sidebar'
import { PageHeader } from '@/components/navigation/header'

import { SearchPaperResult, columns } from './search-columns'
import { SearchResultTable } from './search-table'

interface SearchResponse { total: number; offset: number; next: number; data: SearchPaperResult[]; }

async function getSearchResults(searchQuery: string): Promise<SearchResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const queryParams = new URLSearchParams({ query: searchQuery });
    const url = `${baseUrl}/api/search?${queryParams.toString()}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API responded with status code ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching search results:', error);
        return { total: 0, offset: 0, next: 0, data: [] };
    }
}

interface SearchProps { searchParams: {[key: string]: string | undefined } }

export default async function Search( { searchParams }: SearchProps ) {
    const searchQuery = searchParams['query'] || '';
    let results: SearchPaperResult[] = [];

    if (searchQuery) {
        const response = await getSearchResults(searchQuery);
        results = response.data;
    }
    
    return (
        <main className="flex flex-col gap-2">
            <Sidebar />
            <PageHeader />
            <section className="p-4 absolute top-16 lg:left-[16.666%] lg:p-8 flex flex-col gap-2 w-full lg:w-5/6">
                <h1 className="text-2xl font-semibold lg:font-bold mb-2">Search results</h1>
                <div className="grid gap-4 w-full overflow-x-auto">
                <Card>
                    <SearchResultTable columns={columns} data={results} />
                </Card>
                </div>
            </section>
        </main>
    )
}