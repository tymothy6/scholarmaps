import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const searchQuery = req.nextUrl.searchParams.get('query') || ''; // defaults to empty string

    const queryParams = new URLSearchParams({
        query: searchQuery,
        limit: '100',
        fields: 'paperId,url,title,abstract,year,referenceCount,citationCount,influentialCitationCount,tldr,journal,authors,publicationTypes',
    });

    const url = `https://api.semanticscholar.org/graph/v1/paper/search?${queryParams.toString()}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`API responded with status code ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in route handler:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to fetch data from API' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}