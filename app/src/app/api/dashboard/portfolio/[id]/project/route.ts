import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@civic/auth-web3/nextjs";
import { z } from "zod";

const prisma = new PrismaClient();

const projectSchema = z.object({
  name: z.string().min(1),
  liveUrl: z.string().url().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  description: z.string().optional().nullable(),
  portfolioId: z.string(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const portfolioId = (await params).id;

    const session = await getUser();
    if (!session?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const civicAuthId = session.id;
    const user = await prisma.user.findUnique({
      where: { civicAuthId: civicAuthId },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }
    const userId = user.id;

    const portfolio = await prisma.portfolio.findUnique({
      where: { id: portfolioId, userId: userId },
    });
    if (!portfolio) {
      return new NextResponse("Portfolio not found or unauthorized", {
        status: 404,
      });
    }

    const projects = await prisma.project.findMany({
      where: { portfolioId: portfolioId },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
