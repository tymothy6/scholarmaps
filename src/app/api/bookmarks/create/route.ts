import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma-db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'User ID is required. Please authenticate before issuing your request.'}, { status: 401 })
    }

    const { paperId } = await request.json();

    try { 
        // (1) Check if the bookmark already exists
        const existingBookmark = await prisma.searchBookmark.findFirst({
            where: {
                userId: session.user.id,
                paperId,
            },
        });

        if (existingBookmark) {
            return NextResponse.json({ message: 'Bookmark already exists.' }, { status: 400 });
        } else {
            // (2) Create the bookmark
            await prisma.searchBookmark.create({
                data: {
                    userId: session.user.id,
                    paperId,
                },
            });
        }

        return NextResponse.json({ message: 'Bookmark added successfully.' }, { status: 200 });
    } catch (error) {
        console.error('Failed to add bookmark:', error);
        return NextResponse.json({ message: 'Failed to add bookmark.' }, { status: 500 });
    }
}