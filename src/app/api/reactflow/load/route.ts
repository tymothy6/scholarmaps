import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma-db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
    const route = new URL(req.url).pathname;
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'User ID is required. Please authenticate before issuing your request.'}, { status: 401 })
    };
    
    try {
        const state = await prisma.reactFlowState.findUnique({
            where: {
                userId_route: {
                    userId: session.user.id,
                    route: route,
                },
            },
        });

        if (!state) {
            return NextResponse.json({ message: 'ReactFlow state not found for user in database.' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'ReactFlow state retrieved successfully.',
            state,
        }, { status: 200 });
    } catch (error) {
        console.error('Failed to retrieve ReactFlow state:', error);
        return NextResponse.json({ message: 'Failed to retrieve ReactFlow state.' }, { status: 500 });
    }
}