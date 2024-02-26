import { NextRequest, NextResponse } from 'next/server';
import { PaperCitationResponse, PaperCitationResult } from '@/app/(main)/map/page';

async function fetchCitations(paperId: string, offset = 0, allCitations: PaperCitationResult[] = []): Promise<PaperCitationResult[]> {
    const limit = 1000;
    const fields = 'isInfluential,url,title,abstract,year,referenceCount,citationCount,influentialCitationCount,journal,authors,publicationTypes';
    const url = `https://api.semanticscholar.org/graph/v1/paper/${paperId}/citations?limit=${limit}&offset=${offset}&fields=${fields}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Citations API responded with status code ${response.status}: ${response.statusText}`);
        }

        const data: PaperCitationResponse = await response.json();
        allCitations.push(...data.data);

        if (data.data.length === limit) {
            return await fetchCitations(paperId, offset + limit, allCitations);
        } else {
            return allCitations;
        }
    } catch (error) {
        console.error('Error fetching citations:', error);
        throw error;
    }
}

export async function GET(req: NextRequest) {
    const paperId = req.nextUrl.searchParams.get('paperId') || ''; 

    try {
        const citations = await fetchCitations(paperId);
        // console.log(`Total citations fetched: ${citations.length}`); // debug

        const response = NextResponse.json(citations);

        return response;
    } catch (error) {
        console.error('Error in citations route handler:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to fetch data from citations API' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

