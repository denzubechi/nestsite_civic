import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@civic/auth-web3/nextjs";

const prisma = new PrismaClient();

// --- GET ALL STOREFRONTS FOR THE AUTHENTICATED USER ---
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

    const storefronts = await prisma.storefront.findMany({
      where: { userId },
      // Optionally include related data for all storefronts if needed
      // include: { categories: true },
    });

    return NextResponse.json(storefronts);
  } catch (error) {
    console.error("Failed to fetch storefronts:", error);
    return NextResponse.json(
      { error: "Failed to fetch storefronts" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// --- POST (CREATE) A NEW STOREFRONT ---
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

    const newStorefront = await prisma.storefront.create({
      data: {
        userId: userId,
        name: body.name,
        imageUrl: body.imageUrl,
        description: body.description,
      },
      // Optionally include created categories in response
      // include: { categories: true },
    });

    return NextResponse.json(newStorefront, { status: 201 });
  } catch (error) {
    console.error("Failed to create storefront:", error);
    return NextResponse.json(
      { error: "Failed to create storefront" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
