import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const userId = request.headers.get('userId');
    const { content } = await request.json();
  
    if (!userId || !content) {
      return NextResponse.json({ error: 'User ID and content are required' }, { status: 400 });
    }
  
    try {
      await prisma.novelEditorHistory.upsert({
        where: { id: userId },
        update: {
          content,
          updatedAt: new Date(),
        },
        create: {
          userId,
          content,
        },
      });
  
      return NextResponse.json({ message: 'Content saved successfully' }, { status: 200 });
    } catch (error) {
      console.error('Failed to save content:', error);
      return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
    }
  }