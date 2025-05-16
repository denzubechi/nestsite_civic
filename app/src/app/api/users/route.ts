import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@civic/auth-web3/nextjs";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const userSession = await getUser();
  if (!userSession?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const civicAuthId = userSession.id;

    const existingUser = await prisma.user.findUnique({
      where: { civicAuthId },
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          civicAuthId: civicAuthId,
        },
      });
      return NextResponse.json(
        { message: "User created successfully", user: newUser },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "User already exists" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating/finding user:", error);
    return NextResponse.json(
      { error: "Failed to create or find user" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
