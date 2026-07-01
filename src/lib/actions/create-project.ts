"use server";

import { prisma, Prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export type ProjectWriteInput = {
    title: string;
    description: string;
    image?: string;
    demoUrl : string;
}

export async function createProject(
  data: ProjectWriteInput
): Promise<{ success: true; id: string } | { success: false; error: string }> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return { success: false, error: "Non authentifié." };
    }

    const title = data.title?.trim();
    if (!title || title.length < 5) {
      return { success: false, error: "Le titre doit comporter au moins 5 caractères." };
    }

    const demoUrl = data.demoUrl?.trim();
    if (!demoUrl) {
      return { success: false, error: "L'URL de démo est requise." };
    }

    const project = await prisma.project.create({
      data: {
        title,
        description: data.description?.trim() || null,
        image: data.image?.trim() || null,
        demoUrl,
        userId: session.user.id,
      },
      select: { id: true },
    });

    return { success: true, id: project.id };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = (error.meta?.target as string[] | undefined)?.[0];
      if (target === "title") {
        return { success: false, error: "Ce titre est déjà utilisé." };
      }
      if (target === "demoUrl") {
        return { success: false, error: "Cette URL de démo est déjà utilisée." };
      }
      return { success: false, error: "Ce projet existe déjà." };
    }
    console.error("createProject error:", error);
    return { success: false, error: "Erreur lors de la création du projet." };
  }
}