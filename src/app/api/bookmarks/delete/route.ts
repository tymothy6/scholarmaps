import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma-db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'User ID is required. Please authenticate before issuing your request.'}, { status: 401 });
    }

    const { paperId } = await request.json();

    try {
        // (1) Find the bookmark to delete
        const bookmark = await prisma.searchBookmark.findFirst({
            where: {
                userId: session.user.id,
                paperId,
            },
        });

        if (!bookmark) {
            return NextResponse.json({ message: 'Bookmark not found.' }, { status: 404 });
        }

        // (2) Delete the bookmark
        await prisma.searchBookmark.delete({
            where: {
                id: bookmark.id,
            },
        });

        return NextResponse.json({ message: 'Bookmark deleted successfully.' }, { status: 200 });
    } catch (error) {
        console.error('Failed to delete bookmark:', error);
        return NextResponse.json({ message: 'Failed to delete bookmark.' }, { status: 500 });
    }
}