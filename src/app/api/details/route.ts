import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const searchQuery = req.nextUrl.searchParams.get('query') || ''; 

    const queryParams = new URLSearchParams({
        query: searchQuery,
        fields: 'paperId,url,title,abstract,year,referenceCount,citationCount,influentialCitationCount,tldr,journal,authors,publicationTypes',
    });

    const url = `https://api.semanticscholar.org/graph/v1/paper/${queryParams.toString()}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Paper details API responded with status code ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in paper details route handler:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to fetch data from paper details API' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}