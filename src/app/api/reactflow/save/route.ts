import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma-db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function POST (req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'User ID is required. Please authenticate before issuing your request.'}, { status: 401 })
  };

  const { nodes, edges, route } = await req.json();

  try {
  const state = await prisma.reactFlowState.upsert({
    where: { 
        userId_route: {
            userId: session.user.id,
            route: route,
        },
     },
    create: {
      userId: session.user.id,
      route: route,
      nodes: nodes,
      edges: edges,
    },
    update: {
      nodes: nodes,
      edges: edges,
    },
  });

  return NextResponse.json({
    message: 'React Flow state saved successfully.',
    state,
}, { status: 200 });
  } catch (error) {
    console.error('Failed to save React Flow state:', error);
    return NextResponse.json({ message: 'Failed to save React Flow state.' }, { status: 500 });
  }
}