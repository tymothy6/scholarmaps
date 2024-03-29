import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma-db';
import { type SearchPaperResult } from '@/app/(main)/search/tables/search-columns';

export async function GET(req: NextRequest) {
    const searchQuery = req.nextUrl.searchParams.get('query') || ''; // defaults to empty string

    try {
        // Check if the search query exists in the database
        const existingQuery = await prisma.searchQuery.findUnique({
            where: {
                query: searchQuery,
            },
            include: {
                searchResponse: {
                    include: {
                        data: true,
                    },
                },
            },
        });

        if (existingQuery) {
            // If the search query exists, return existing data
            const response = {
                total: existingQuery.searchResponse.total,
                offset: existingQuery.searchResponse.offset,
                next: existingQuery.searchResponse.next,
                data: existingQuery.searchResponse.data,
                createdAt: existingQuery.createdAt, 
                updatedAt: existingQuery.searchResponse.updatedAt,
            };
            return NextResponse.json(response);
        }

        // If the search query doesn't exist, send new Semantic Scholar API request
        const queryParams = new URLSearchParams({
            query: searchQuery,
            limit: '100', // Must be <= 100 for paper relevance search
            fields: 'paperId,url,title,abstract,year,referenceCount,citationCount,influentialCitationCount,tldr,journal,authors,publicationTypes,isOpenAccess,openAccessPdf',
        });

        const url = `https://api.semanticscholar.org/graph/v1/paper/search?${queryParams.toString()}`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // If the API call was successful
            const data = await response.json();

            if (data.data.length === 0) {
                // Case: no results found for the given search query
                const queryData = await prisma.searchQuery.create({
                    data: {
                        query: searchQuery,
                    },
                });

                const responseData = {
                    message: 'No results found for the given search query.',
                    createdAt: queryData.createdAt,
                };

                return NextResponse.json(responseData);
            }

            // Save the search query and response to the database
            const queryData = await prisma.searchQuery.create({
                data: {
                    query: searchQuery,
                    searchResponse: {
                        create: {
                            total: data.total,
                            offset: data.offset,
                            next: data.next,
                            data: {
                                create: data.data.map((result: SearchPaperResult) => ({
                                    paperId: result.paperId,
                                    url: result.url,
                                    title: result.title,
                                    abstract: result.abstract,
                                    year: result.year,
                                    referenceCount: result.referenceCount,
                                    citationCount: result.citationCount,
                                    influentialCitationCount: result.influentialCitationCount,
                                    tldr: result.tldr,
                                    journal: result.journal,
                                    authors: result.authors,
                                    publicationTypes: result.publicationTypes,
                                    isOpenAccess: result.isOpenAccess,
                                    openAccessPdf: result.openAccessPdf,
                                })),
                            },
                        },
                    },
                },
                include: {
                    searchResponse: {
                        include: {
                            data: true,
                        },
                    },
                },
            });

            const responseData = {
                total: queryData.searchResponse.total,
                offset: queryData.searchResponse.offset,
                next: queryData.searchResponse.next,
                data: queryData.searchResponse.data,
                createdAt: queryData.createdAt,
                updatedAt: queryData.searchResponse.updatedAt,
            };

            return NextResponse.json(responseData);
        } else {
            // Case: API call failed
            const errorData = await response.json();
            console.error('Error from Semantic Scholar API:', errorData);

            // Save the search query to the database
            const queryData = await prisma.searchQuery.create({
                data: {
                    query: searchQuery,
                },
            });

            const responseData = {
                message: 'Failed to fetch data from the Semantic Scholar API.',
                error: errorData,
                createdAt: queryData.createdAt,
            };

            return NextResponse.json(responseData, { status: response.status });
        }
    } catch (error) {
        console.error('Error in paper search route handler:', error);
        return new NextResponse(JSON.stringify({ error: 'An unexpected error occurred' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}