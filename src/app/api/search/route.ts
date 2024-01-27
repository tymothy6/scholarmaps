import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const searchQuery = req.nextUrl.searchParams.get('query') || ''; // defaults to empty string

    const queryParams = new URLSearchParams({
        query: searchQuery,
        limit: '100',
        fields: 'paperId,url,title,year,authors,abstract,referenceCount,citationCount,influentialCitationCount,journal,tldr',
    });

    const url = `https://api.semanticscholar.org/graph/v1/paper/search?${queryParams.toString()}`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        return NextResponse.error();
    }

    const data = await response.json();

    return NextResponse.json(data);
}