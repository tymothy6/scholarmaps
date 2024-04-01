import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma-db';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    try {
        const recentSearches = await prisma.searchQuery.findMany({
            where: {
                user: {
                    id: userId,
                },
            },
            orderBy: { createdAt: 'desc' },
            take: 10,
            select: {
                query: true,
                createdAt: true,
                searchResponse: {
                    select: {
                        total: true,
                        offset: true,
                        next: true,
                        data: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });

        return NextResponse.json(recentSearches);
    } catch (error) {
        console.error('Error fetching recent searches:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to fetch recent searches' }), {
        status: 500,
        headers: {
            'Content-Type': 'application/json',
        },
        });
    }
}