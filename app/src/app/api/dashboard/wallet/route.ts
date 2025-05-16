import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@civic/auth-web3/nextjs";

const prisma = new PrismaClient();

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
    const { solWalletAddress } = body;

    if (!solWalletAddress) {
      return new NextResponse("Solana wallet address is required", {
        status: 400,
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { solWalletAddress: solWalletAddress },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Failed to update wallet address:", error);
    return NextResponse.json(
      { error: "Failed to update wallet address" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Best practice to disconnect
  }
}
