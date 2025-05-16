import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@civic/auth-web3/nextjs";

const prisma = new PrismaClient();

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
    const totalPortfolios = await prisma.portfolio.count({
      where: { userId },
    });
    const totalProjects = await prisma.project.count({
      where: {
        portfolio: {
          userId: userId,
        },
      },
    });
    const totalProducts = await prisma.product.count({
      where: {
        category: {
          storefront: {
            userId: userId,
          },
        },
      },
    });

    const totalStorefronts = await prisma.storefront.count({
      where: { userId },
    });
    const totalPaymentLinks = 0;
    return NextResponse.json({
      totalPortfolios,
      totalProjects,
      totalProducts,
      totalStorefronts,
      totalPaymentLinks,
    });
  } catch (error) {
    console.error("Failed to fetch totals:", error);
    return NextResponse.json(
      { error: "Failed to fetch totals" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
