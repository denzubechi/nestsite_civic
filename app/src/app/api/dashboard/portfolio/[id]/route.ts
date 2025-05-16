import { NextResponse, NextRequest } from "next/server";
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

// --- GET A SINGLE PORTFOLIO BY ID ---
export async function GET(
  request: NextRequest, // Changed to NextRequest for consistency
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

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
    const portfolioId = id; // Use the awaited id

    if (!portfolioId) {
      return NextResponse.json(
        { error: "Missing portfolio ID" },
        { status: 400 }
      );
    }

    const portfolio = await prisma.portfolio.findUnique({
      where: { id: portfolioId, userId: userId },
      include: { projects: true },
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error(
      `Failed to fetch portfolio with ID ${(await params).id}:`,
      error
    );
    return NextResponse.json(
      { error: `Failed to fetch portfolio with ID ${(await params).id}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// --- PUT (UPDATE) A SPECIFIC PORTFOLIO ---
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
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
    const portfolioId = id;
    if (!portfolioId) {
      return NextResponse.json(
        { error: "Missing portfolio ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const validationResult = portfolioSchema.partial().safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { id: portfolioId, userId: userId },
    });

    if (!existingPortfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    const updatedPortfolio = await prisma.portfolio.update({
      where: { id: portfolioId },
      data: validationResult.data,
      include: { projects: true },
    });

    return NextResponse.json(updatedPortfolio);
  } catch (error) {
    console.error(
      `Failed to update portfolio with ID ${(await params).id}:`,
      error
    );
    return NextResponse.json(
      { error: `Failed to update portfolio with ID ${(await params).id}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// --- DELETE A SPECIFIC PORTFOLIO ---
export async function DELETE(
  request: NextRequest, // Changed to NextRequest for consistency
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

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
    const portfolioId = id; // Use the awaited id

    if (!portfolioId) {
      return NextResponse.json(
        { error: "Missing portfolio ID" },
        { status: 400 }
      );
    }

    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { id: portfolioId, userId: userId },
    });

    if (!existingPortfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    await prisma.portfolio.delete({
      where: { id: portfolioId },
    });

    return NextResponse.json({
      message: `Portfolio with ID ${portfolioId} deleted successfully`,
    });
  } catch (error) {
    console.error(
      `Failed to delete portfolio with ID ${(await params).id}:`,
      error
    );
    return NextResponse.json(
      { error: `Failed to delete portfolio with ID ${(await params).id}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
