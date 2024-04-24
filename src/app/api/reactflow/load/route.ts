import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma-db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    const { searchParams } = new URL(req.url);
    const flowName = searchParams.get('name');

    if (!session) {
        return NextResponse.json({ message: 'User ID is required. Please authenticate before issuing your request.'}, { status: 401 })
    };
    
    try {
        const state = await prisma.reactFlowState.findFirst({
            where: {
                userId: session.user.id,
                name: flowName || undefined,
            },
        });

        if (!state) {
            return NextResponse.json({ message: 'Named ReactFlow state not found for user in database.' }, { status: 404 });
        }

        return NextResponse.json(state, { status: 200 });
    } catch (error) {
        console.error('Failed to retrieve ReactFlow state:', error);
        return NextResponse.json({ message: 'Failed to retrieve ReactFlow state.' }, { status: 500 });
    }
}