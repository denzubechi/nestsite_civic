import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@civic/auth-web3/nextjs";

const prisma = new PrismaClient();

// --- GET A SINGLE STOREFRONT BY ID ---
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
    const storefrontId = id; // Use the awaited id

    if (!storefrontId) {
      return NextResponse.json(
        { error: "Missing storefront ID" },
        { status: 400 }
      );
    }

    const storefront = await prisma.storefront.findUnique({
      where: { id: storefrontId, userId: userId },
      include: { categories: { include: { products: true } } }, // Optionally include related data
    });

    if (!storefront) {
      return NextResponse.json(
        { error: "Storefront not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(storefront);
  } catch (error) {
    console.error(
      `Failed to fetch storefront with ID ${(await params).id}:`,
      error
    );
    return NextResponse.json(
      { error: `Failed to fetch storefront with ID ${(await params).id}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// --- PUT (UPDATE) A SPECIFIC STOREFRONT ---
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id; // Await the params and get the id
    const storefrontId = id;

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

    if (!storefrontId) {
      return NextResponse.json(
        { error: "Missing storefront ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const existingStorefront = await prisma.storefront.findUnique({
      where: { id: storefrontId, userId: userId },
    });

    if (!existingStorefront) {
      return NextResponse.json(
        { error: "Storefront not found" },
        { status: 404 }
      );
    }

    const updatedStorefront = await prisma.storefront.update({
      where: { id: storefrontId },
      data: {
        name: body.name,
        imageUrl: body.imageUrl,
        description: body.description,
      },
      // Optionally include updated categories in response
      // include: { categories: true },
    });

    return NextResponse.json(updatedStorefront);
  } catch (error) {
    console.error(
      `Failed to update storefront with ID ${(await params).id}:`,
      error
    );
    return NextResponse.json(
      { error: `Failed to update storefront with ID ${(await params).id}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
// --- DELETE A SPECIFIC STOREFRONT ---
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
    const storefrontId = id; // Use the awaited id

    if (!storefrontId) {
      return NextResponse.json(
        { error: "Missing storefront ID" },
        { status: 400 }
      );
    }

    const existingStorefront = await prisma.storefront.findUnique({
      where: { id: storefrontId, userId: userId },
    });

    if (!existingStorefront) {
      return NextResponse.json(
        { error: "Storefront not found" },
        { status: 404 }
      );
    }

    await prisma.storefront.delete({
      where: { id: storefrontId },
    });

    return NextResponse.json({
      message: `Storefront with ID ${storefrontId} deleted successfully`,
    });
  } catch (error) {
    console.error(
      `Failed to delete storefront with ID ${(await params).id}:`,
      error
    );
    return NextResponse.json(
      { error: `Failed to delete storefront with ID ${(await params).id}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
