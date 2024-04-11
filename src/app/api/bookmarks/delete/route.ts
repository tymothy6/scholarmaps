import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma-db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'User ID is required. Please authenticate before issuing your request.'}, { status: 401 });
    }

    const { paperIds } = await request.json();

    if (!Array.isArray(paperIds)) {
        return NextResponse.json({ message: 'Invalid request.' }, { status: 400 });
    }

    try {
        // (1) Delete bookmarks & update the paper results
        const deleteResult = await prisma.searchBookmark.deleteMany({
            where: {
                userId: session.user.id,
                paperId: {
                    in: paperIds,
                },
            },
        });

        await prisma.searchPaperResult.updateMany({
            where: {
                paperId: {
                    in: paperIds,
                },
            },
            data: {
                bookmarked: false,
            },
        });
        
        // (2) Return response
        const deletedCount = deleteResult.count;

        return NextResponse.json({
            message: `${deletedCount} bookmarks deleted successfully.`,
        }, { status: 200 });
    } catch (error) {
        console.error('Failed to delete bookmark:', error);
        return NextResponse.json({ message: 'Failed to delete bookmark.' }, { status: 500 });
    }
}