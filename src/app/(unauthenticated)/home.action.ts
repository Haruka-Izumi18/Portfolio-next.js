"use server";

import { prisma } from "@/lib/prisma";

export type HomeProject = {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  demoUrl: string;
};

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function getHomeProjects(): Promise<ActionResult<HomeProject[]>>  {
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        demoUrl: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: projects };
  } catch (error) {
    console.error("Échec de la récupération des projets d'accueil:", error);
    return { success: false, error: "Impossible de récupérer le projet." };
  }
}