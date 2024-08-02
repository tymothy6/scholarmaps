import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma-db";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const route = request.headers.get("route");

  if (!userId || !route) {
    return NextResponse.json(
      {
        error:
          "User ID and request route are required. Please authenticate before issuing your request.",
      },
      { status: 400 },
    );
  }

  try {
    const history = await prisma.novelEditorHistory.findUnique({
      where: {
        userId_route: {
          userId,
          route,
        },
      },
    });

    if (!history) {
      return NextResponse.json({ content: null }, { status: 200 });
    }

    return NextResponse.json({ content: history.content }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 },
    );
  }
}
