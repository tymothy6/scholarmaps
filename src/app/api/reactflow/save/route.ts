import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Prisma } from "@prisma/client"; // access the Prisma error types

export async function POST(req: NextRequest) {
  const route = new URL(req.url).pathname;
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        message:
          "User ID is required. Please authenticate before issuing your request.",
      },
      { status: 401 },
    );
  }

  const { nodes, edges, name } = await req.json();

  // If the named ReactFlow state already exists, update it
  // Otherwise, create a new one
  try {
    const state = await prisma.reactFlowState.upsert({
      where: {
        userId_route_name: {
          userId: session.user.id,
          route: route,
          name: name,
        },
      },
      create: {
        userId: session.user.id,
        route: route,
        name: name,
        nodes: nodes,
        edges: edges,
      },
      update: {
        nodes: nodes,
        edges: edges,
      },
    });

    return NextResponse.json(
      {
        message: "React Flow state saved successfully.",
        state,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // If the named ReactFlow state already exists, return a message to the frontend
        return NextResponse.json(
          { message: "A React Flow state with the same name already exists." },
          { status: 409 },
        );
      }
    }
    console.error("Failed to save React Flow state:", error);
    return NextResponse.json(
      { message: "Failed to save React Flow state." },
      { status: 500 },
    );
  }
}
