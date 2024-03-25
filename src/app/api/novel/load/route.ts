import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const userId = request.headers.get('userId');
  const route = request.nextUrl.pathname;

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const history = await prisma.novelEditorHistory.findUnique({
      where: { 
        userId_route: {
          userId,
          route,
        }
       },
    });

    if (!history) {
      return NextResponse.json({ content: null }, { status: 200 });
    }

    return NextResponse.json({ content: history.content }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}
