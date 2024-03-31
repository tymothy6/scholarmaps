import { Suspense } from 'react'

import { SearchPaperResult, columns } from './tables/search-columns'
import { SearchResultTable } from './tables/search-table'
import { SearchTableSkeleton } from './search-skeleton'
import { RecentSearches } from './recents'
import { 
    Alert,
    AlertDescription,
    AlertTitle,
 } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export async function generateMetadata({ searchParams }: { searchParams: {[key: string]: string | undefined } }) {
    const title = searchParams['query'] ? `Search results for ${searchParams['query']}` : 'Search';
    const description = 'Search for papers in the Semantic Scholar research corpus';
    return { title, description };
}

// Shape of the response from a successful call
interface SearchResponse { 
    total: number; 
    offset: number; 
    next: number; 
    data: SearchPaperResult[];
    createdAt: Date | null;
    updatedAt: Date | null;
 }

// Shape of the response from a failed call
interface ErrorResponse {
    message: string;
    error: JSON;
    createdAt: Date | null;
 }

async function getSearchResults(searchQuery: string): Promise<SearchResponse | ErrorResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const queryParams = new URLSearchParams({ query: searchQuery });
    const url = `${baseUrl}/api/search?${queryParams.toString()}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorData: ErrorResponse = await response.json();
            console.error('Error fetching search results:', errorData);
            return errorData;
        }

        const data: SearchResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching search results:', error);
        return { total: 0, offset: 0, next: 0, data: [], createdAt: null, updatedAt: new Date(), message: 'Failed to fetch search results'};
    }
}

export interface RecentSearchResponse {
    query: string;
    createdAt: Date;
    searchResponse: SearchResponse | null; // can be null if there is no response for a given query
}

async function getRecentSearches(): Promise<RecentSearchResponse[]> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/search/recents`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Recent searches API responded with status code ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data === null) { // if no recent searches
            return [];
        } else {
            return data;
        }
    } catch (error) {
        console.error('Error fetching recent searches:', error);
        return [];
    }
}

interface SearchProps { searchParams: { [key: string]: string | undefined } }

export default async function Search( { searchParams }: SearchProps ) {
    const searchQuery = searchParams['query'] || '';

    async function RecentSearchesCard() {
        let recentSearches: RecentSearchResponse[] = [];

        recentSearches = await getRecentSearches();

        return <RecentSearches recentSearches={recentSearches} />;
    }

    async function SearchResultsCard() {
        let results: SearchPaperResult[] = [];
        let timestamp: Date | null = new Date();
        let errorMessage: string | null = null;

        if (searchQuery) {
            const response = await getSearchResults(searchQuery);

            if ('data' in response) { // successful response
                results = response.data;
                timestamp = response.createdAt;
            } else {
                errorMessage = response.message; // error response
            }
        }

        return (
            <div className="flex flex-col gap-2">
                {errorMessage ? (
                    <Alert variant="destructive">
                        <AlertCircle className="w-4 h-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                ) : (
                    <>
                        {timestamp && <p className="mt-2 text-sm font-medium text-muted-foreground">Last updated: {timestamp.toLocaleString()}</p>}
                        <SearchResultTable columns={columns} data={results} />
                    </>
                )}
            </div>
        )
    }
    
    return (
        <section className="bg-background p-4 absolute top-10 lg:left-[16.666%] lg:p-8 flex flex-col gap-2 w-full overflow-x-hidden lg:w-5/6">
            <h1 className="mt-2 lg:mt-0 text-xl lg:text-2xl font-semibold lg:font-bold">Search {searchQuery ? <span>for<span className="ml-2 px-2 py-1 text-lg lg:text-xl border bg-secondary rounded font-mono">{searchQuery}</span></span> : ''}</h1>
            <div className="w-full">
                {searchQuery ?
                    <Suspense fallback={<SearchTableSkeleton />}>
                    <SearchResultsCard />
                    </Suspense>
                :
                    <RecentSearchesCard />
                }
            </div>
        </section>
    )
}