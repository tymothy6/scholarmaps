import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma-db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { SearchPaperResult } from '@prisma/client';

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'User ID is required. Please authenticate before issuing your request.'}, { status: 401 })
    }

    const { paperIds } = await request.json();

    if (!Array.isArray(paperIds)) {
        return NextResponse.json({ message: 'Invalid request.' }, { status: 400 });
    }

    try { 
        // (1) Check for existing bookmarks
        const existingBookmarks = await prisma.searchBookmark.findMany({
            where: {
                userId: session.user.id,
                paperId: {
                    in: paperIds,
                },
            },
            select: {
                paperId: true,
            },
        });

        const existingPaperIds = existingBookmarks.map((bookmark: SearchPaperResult) => bookmark.paperId);
        const newPaperIds = paperIds.filter((paperId) => !existingPaperIds.includes(paperId));

        // (2) Create bookmarks & update the paper results
        const createdBookmarks = await prisma.searchBookmark.createMany({
            data: newPaperIds.map((paperId) => ({
                userId: session.user.id,
                paperId,
            })),
        });

        await prisma.searchPaperResult.updateMany({
            where: {
                paperId: {
                    in: newPaperIds,
                },
            },
            data: {
                bookmarked: true,
            },
        });

        // (3) Return response with counts
        const createdCount = createdBookmarks.count;
        const skippedCount = paperIds.length - createdCount;

        return NextResponse.json({
            message: `${createdCount} bookmarks created successfully. ${skippedCount} duplicates were skipped.`,
        }, { status: 200 });
    } catch (error) {
        console.error('Failed to add bookmarks:', error);
        return NextResponse.json({ message: 'Failed to add bookmarks.' }, { status: 500 });
    }
}