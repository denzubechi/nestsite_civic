import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@civic/auth-web3/nextjs";
import { z } from "zod";

const prisma = new PrismaClient();

const portfolioSchema = z.object({
  fullName: z.string().min(3),
  skill: z.string().min(2),
  description: z.string().optional().nullable(),
  profilePhoto: z.string().optional().nullable(),
});

// --- GET ALL PORTFOLIOS FOR THE AUTHENTICATED USER ---
export async function GET() {
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

    const portfolios = await prisma.portfolio.findMany({
      where: { userId: userId },
      // Optionally include projects for all portfolios if needed
      // include: { projects: true },
    });

    return NextResponse.json(portfolios);
  } catch (error) {
    console.error("Failed to fetch portfolios:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolios" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// --- POST (CREATE) A NEW PORTFOLIO ---
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
    const validationResult = portfolioSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const newPortfolio = await prisma.portfolio.create({
      data: {
        userId: userId,
        ...validationResult.data,
      },
      // Optionally include projects in the response
      // include: { projects: true },
    });

    return NextResponse.json(newPortfolio, { status: 201 });
  } catch (error) {
    console.error("Failed to create portfolio:", error);
    return NextResponse.json(
      { error: "Failed to create portfolio" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
