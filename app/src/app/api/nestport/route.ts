import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { fullNameJoined } = await request.json();

    if (!fullNameJoined) {
      return NextResponse.json(
        { error: "Missing fullNameJoined in the request body" },
        { status: 400 }
      );
    }

    const fullNameWithSpaces = fullNameJoined.split("-").join(" ");
    const lowercaseFullNameWithSpaces = fullNameWithSpaces.toLowerCase();

    console.log(lowercaseFullNameWithSpaces);

    const portfolio = await prisma.portfolio.findFirst({
      where: {
        fullName: {
          equals: lowercaseFullNameWithSpaces,
          mode: "insensitive",
        },
      },
      include: {
        projects: true,
        user: true,
      },
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(portfolio, { status: 200 });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
