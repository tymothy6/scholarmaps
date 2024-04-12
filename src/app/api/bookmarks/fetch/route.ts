import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma-db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'User ID is required. Please authenticate before issuing your request.'}, { status: 401 })
    }

    try {
        const bookmarks = await prisma.searchBookmark.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                searchPaperResult: true,
            },
        });

        return NextResponse.json(bookmarks);
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        return NextResponse.json({ message: 'Error fetching bookmarks.' }, { status: 500 });
    }
}