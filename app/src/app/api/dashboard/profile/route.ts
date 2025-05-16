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
    const {
      name,
      email,
      twitterUrl,
      linkedInUrl,
      instagramUrl,
      facebookUrl,
      youTubeUrl,
    } = body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        twitterUrl,
        linkedInUrl,
        instagramUrl,
        facebookUrl,
        youTubeUrl,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Failed to update profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
export async function GET(req: Request) {
  try {
    const session = await getUser();

    if (!session?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const civicAuthId = session.id;

    const user = await prisma.user.findUnique({
      where: { civicAuthId: civicAuthId },
      select: {
        id: true,
        name: true,
        email: true,
        twitterUrl: true,
        linkedInUrl: true,
        instagramUrl: true,
        facebookUrl: true,
        youTubeUrl: true,
        solWalletAddress: true,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
