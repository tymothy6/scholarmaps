import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma-db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

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
        // (1) Create bookmarks
        const createResult = await prisma.searchBookmark.createMany({
            data: paperIds.map((paperId) => ({
                userId: session.user.id,
                paperId,
            })),
            skipDuplicates: true,
        });

        // (2) Return response with duplicates skipped
        const createdCount = createResult.count;
        const skippedCount = paperIds.length - createdCount;

        return NextResponse.json({
            message: `${createdCount} bookmarks created successfully. ${skippedCount} duplicates were skipped.`,
        }, { status: 200 });
    } catch (error) {
        console.error('Failed to add bookmarks:', error);
        return NextResponse.json({ message: 'Failed to add bookmarks.' }, { status: 500 });
    }
}