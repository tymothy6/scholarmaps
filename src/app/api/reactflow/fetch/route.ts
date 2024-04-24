// /api/reactflow/list.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma-db';

export async function GET(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'User ID is required. Please authenticate before issuing your request.'}, { status: 401 })
    }

    try {
        const reports = await prisma.reactFlowState.findMany({
            where: {
                userId: session.user.id,
            },
            select: {
                name: true,
            },
        });

        return NextResponse.json({
            message: 'ReactFlow states fetched successfully.',
            reports,
        }, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch ReactFlow states:', error);
        return NextResponse.json({ message: 'Failed to fetch ReactFlow states.' }, { status: 500 });
    }
}
