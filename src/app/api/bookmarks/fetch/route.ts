import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-db";

export async function POST(request: NextRequest) {
  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json(
      {
        message:
          "User ID is required. Please authenticate before issuing your request.",
      },
      { status: 401 },
    );
  }

  try {
    const bookmarks = await prisma.searchBookmark.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        userId: true,
        paperId: true,
        searchPaperResultId: true,
        createdAt: true,
        paper: {
          select: {
            id: true,
            paperId: true,
            title: true,
            url: true,
            abstract: true,
            year: true,
            referenceCount: true,
            citationCount: true,
            influentialCitationCount: true,
            tldr: true,
            journal: true,
            authors: true,
            publicationTypes: true,
            isOpenAccess: true,
            openAccessPdf: true,
            bookmarked: true,
          },
        },
      },
    });

    return NextResponse.json(bookmarks);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return NextResponse.json(
      { message: "Error fetching bookmarks." },
      { status: 500 },
    );
  }
}
