import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma-db';

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const { content, route } = await request.json();
  
    if (!userId || !content) {
      return NextResponse.json({ error: 'User ID and content are required. Please authenticate before issuing your request. ' }, { status: 400 });
    }
  
    try {
      await prisma.novelEditorHistory.upsert({
        where: { 
          userId_route: { 
            userId, 
            route
           } 
        },
        update: {
          content,
          updatedAt: new Date(),
        },
        create: {
          userId,
          route,
          content,
        },
      });
  
      return NextResponse.json({ message: 'Content saved successfully' }, { status: 200 });
    } catch (error) {
      console.error('Failed to save content:', error);
      return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
    }
  }