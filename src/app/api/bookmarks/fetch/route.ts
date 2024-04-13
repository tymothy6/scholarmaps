import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma-db';

export async function POST(request: NextRequest) {
    const { userId } = await request.json();

    if (!userId) {
        return NextResponse.json({ message: 'User ID is required. Please authenticate before issuing your request.'}, { status: 401 })
    }

    try {
        const bookmarks = await prisma.searchBookmark.findMany({
            where: {
                userId: userId,
            },
            select: {
                paper: true,
            },
        });

        return NextResponse.json(bookmarks);
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        return NextResponse.json({ message: 'Error fetching bookmarks.' }, { status: 500 });
    }
}