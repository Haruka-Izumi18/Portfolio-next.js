"use server";

import { prisma, Prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export type ProjectWriteInput = {
  title: string;
  description?: string;
  image?: string;
  demoUrl: string;
};

async function requireUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Non authentifié.");
  return session.user.id;
}

export async function updateProject(
  id: string,
  data: ProjectWriteInput
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const userId = await requireUserId();

    const existing = await prisma.project.findUnique({
      where: { id },
      select: { userId: true },
    });
    if (!existing) {
      return { success: false, error: "Projet introuvable." };
    }
    if (existing.userId !== userId) {
      return { success: false, error: "Non autorisé." };
    }

    const title = data.title?.trim();
    if (!title || title.length < 5) {
      return { success: false, error: "Le titre doit comporter au moins 5 caractères." };
    }
    const demoUrl = data.demoUrl?.trim();
    if (!demoUrl) {
      return { success: false, error: "L'URL de démo est requise." };
    }

    await prisma.project.update({
      where: { id },
      data: {
        title,
        description: data.description?.trim() || null,
        image: data.image?.trim() || null,
        demoUrl,
      },
    });

    revalidatePath(`/admin/dashboard/project/${id}`);
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      const target = (error.meta?.target as string[] | undefined)?.[0];
      if (target === "title") return { success: false, error: "Ce titre est déjà utilisé." };
      if (target === "demoUrl") return { success: false, error: "Cette URL de démo est déjà utilisée." };
      return { success: false, error: "Ce projet existe déjà." };
    }
    console.error("updateProject error:", error);
    return { success: false, error: "Erreur lors de la mise à jour." };
  }
}

export async function deleteProject(
  id: string
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const userId = await requireUserId();

    const existing = await prisma.project.findUnique({
      where: { id },
      select: { userId: true },
    });
    if (!existing) {
      return { success: false, error: "Projet introuvable." };
    }
    if (existing.userId !== userId) {
      return { success: false, error: "Non autorisé." };
    }

    await prisma.project.delete({ where: { id } });

    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (error) {
    console.error("deleteProject error:", error);
    return { success: false, error: "Erreur lors de la suppression." };
  }
}