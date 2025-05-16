import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@civic/auth-web3/nextjs";
import { z } from "zod";

const prisma = new PrismaClient();

const projectSchema = z.object({
  name: z.string().min(1),
  liveUrl: z.string().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  description: z.string().optional().nullable(),
  portfolioId: z.string(),
});

export async function POST(req: Request) {
  try {
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

    const body = await req.json();
    const validationResult = projectSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: validationResult.data.portfolioId, userId: userId },
    });
    if (!portfolio) {
      return new NextResponse("Portfolio not found or unauthorized", {
        status: 404,
      });
    }

    const newProject = await prisma.project.create({
      data: validationResult.data,
    });
    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create project:", error);
    return NextResponse.json(
      { error: "Failed to create project, " + error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
