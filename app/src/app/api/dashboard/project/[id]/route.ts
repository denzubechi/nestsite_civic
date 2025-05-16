import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@civic/auth-web3/nextjs";
import { z } from "zod";

const prisma = new PrismaClient();

const projectSchema = z.object({
  name: z.string().min(1),
  liveUrl: z.string().url().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  description: z.string().optional().nullable(),
  portfolioId: z.string(),
});
export async function GET(
  request: NextRequest,
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

    const project = await prisma.project.findUnique({
      where: { id: id, portfolio: { userId: userId } }, // Filtering here
    });

    if (!project) {
      return new NextResponse("Project not found or unauthorized", {
        status: 404,
      });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error(`Failed to fetch project with ID `, error);
    return NextResponse.json(
      { error: `Failed to fetch project with ID` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
export async function PUT(
  req: Request,
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

    const body = await req.json();
    const validationResult = projectSchema.partial().safeParse(body); // Make validation partial
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    // Fetch the existing project AND verify ownership
    const existingProject = await prisma.project.findUnique({
      where: { id: id, portfolio: { userId: userId } },
    });

    if (!existingProject) {
      return new NextResponse("Project not found or unauthorized", {
        status: 404,
      });
    }

    const updatedProject = await prisma.project.update({
      where: { id: id },
      data: validationResult.data,
    });
    return NextResponse.json(updatedProject);
  } catch (error: any) {
    console.error(`Failed to update project`, error);
    return NextResponse.json(
      { error: `Failed to update project , ${error.message}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(
  request: NextRequest,
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
    const existingProject = await prisma.project.findUnique({
      where: { id: id, portfolio: { userId: userId } },
    });

    if (!existingProject) {
      return new NextResponse("Project not found or unauthorized", {
        status: 404,
      });
    }

    await prisma.project.delete({
      where: { id: id },
    });
    return new NextResponse(
      JSON.stringify({ message: `Project with ID ${id} deleted successfully` }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error(`Failed to delete project `, error);
    return NextResponse.json(
      { error: `Failed to delete project, ${error.message}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
