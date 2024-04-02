import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma-db';
import { type SearchPaperResult } from '@/app/(main)/search/tables/search-columns';

export async function GET(request: NextRequest) {
    const urlQuery = request.nextUrl.searchParams.get('query') || ''; 
    const userId = request.nextUrl.searchParams.get('userId') || '';

    try {
        // Check if the search query exists in the database
        const existingQuery = await prisma.searchQuery.findUnique({
            where: {
                query: urlQuery,
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
            // Check if the response associated with the query has data
            if (existingQuery.searchResponse && existingQuery.searchResponse.data.length > 0) {
                // Return existing data
                const response = {
                    total: existingQuery.searchResponse.total,
                    offset: existingQuery.searchResponse.offset,
                    next: existingQuery.searchResponse.next,
                    data: existingQuery.searchResponse.data,
                    createdAt: existingQuery.createdAt, 
                    updatedAt: existingQuery.searchResponse.updatedAt,
                };
                return NextResponse.json(response);
            } else {
                // If the response has no data, refetch
                console.log(`Search query "${urlQuery}" exists in the database, but has no stored data. Refetching...`)
            };
        }

        // If the search query doesn't exist, send new Semantic Scholar API request
        const queryParams = new URLSearchParams({
            query: urlQuery,
            // limit: '100', // Must be <= 100 for paper relevance search
            fields: 'paperId,url,title,abstract,year,referenceCount,citationCount,influentialCitationCount,tldr,journal,authors,publicationTypes,isOpenAccess,openAccessPdf',
        });

        const url = `https://api.semanticscholar.org/graph/v1/paper/search?${queryParams.toString()}`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // Case: the API call is successful
            const data = await response.json();

            try {
                // (1) Save the search query and response to the database
                const queryData = await prisma.searchQuery.upsert({
                    where: {
                        query: urlQuery,
                    },
                    update: {
                        user: {
                            connect: {
                                id: userId,
                            },
                        },
                        searchResponse: {
                            update: {
                                total: data.total,
                                offset: data.offset,
                                next: data.next,
                                data: {
                                    create: data.data.map((result: SearchPaperResult) => ({
                                        paperId: result.paperId,
                                        url: result.url,
                                        title: result.title,
                                        abstract: result.abstract ?? '',
                                        year: result.year,
                                        referenceCount: result.referenceCount,
                                        citationCount: result.citationCount,
                                        influentialCitationCount: result.influentialCitationCount,
                                        tldr: result.tldr ?? {},
                                        journal: result.journal ?? {},
                                        authors: result.authors,
                                        publicationTypes: result.publicationTypes ?? [],
                                        isOpenAccess: result.isOpenAccess ?? false,
                                        openAccessPdf: result.openAccessPdf ?? '',
                                    })),
                                },
                            },
                        },
                    },
                    create: {
                        query: urlQuery,
                        user: {
                            connect: {
                                id: userId,
                            },
                        },
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
                                        abstract: result.abstract ?? '',
                                        year: result.year,
                                        referenceCount: result.referenceCount,
                                        citationCount: result.citationCount,
                                        influentialCitationCount: result.influentialCitationCount,
                                        tldr: result.tldr ?? {},
                                        journal: result.journal ?? {},
                                        authors: result.authors,
                                        publicationTypes: result.publicationTypes ?? [],
                                        isOpenAccess: result.isOpenAccess ?? false,
                                        openAccessPdf: result.openAccessPdf ?? '',
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
                    }
                });

                // (2) Return the search response to the client 
                const responseData = {
                    total: queryData.searchResponse.total,
                    offset: queryData.searchResponse.offset,
                    next: queryData.searchResponse.next,
                    data: queryData.searchResponse.data,
                    createdAt: queryData.createdAt,
                    updatedAt: queryData.searchResponse.updatedAt,
                };

                return NextResponse.json(responseData);
            } catch (error) {
                console.error('Error saving search query to database:', error);
                return NextResponse.json({ error: 'Failed to save search query to database.' }, { status: 500 });
            }
        } else {
            // Case: API call fails
            const errorData = await response.json();
            console.error('Error from Semantic Scholar API:', errorData);

            try {
                // (1) Save the search query to the database
                const queryData = await prisma.searchQuery.upsert({
                    where: {
                        query: urlQuery,
                    },
                    update: {
                        user: {
                            connect: {
                                id: userId,
                            },
                        },
                    },
                    create: {
                        query: urlQuery,
                        user: {
                            connect: {
                                id: userId,
                            },
                        },
                    },
                });

                // (2) Return an error response to the client
                const responseData = {
                    message: 'Failed to fetch data from the Semantic Scholar API.',
                    error: errorData,
                    createdAt: queryData.createdAt,
                };

                return NextResponse.json(responseData, { status: response.status });
            } catch (error) {
                console.error('Error saving search query to database:', error);
                return NextResponse.json({ error: 'Failed to save search query to database.' }, { status: 500 });
            }
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