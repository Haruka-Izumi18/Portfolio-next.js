"use server";

import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 10

export async function getProjects(page: number, search: string){
   try {
    const where = search
    ? {
        title: {
            contains: search,
            mode: "insensitive" as const,
        },
    }
    : {}
    const [projects, total] = await Promise.all([
        prisma.project.findMany({
            where,
            skip: (page - 1 ) * PAGE_SIZE,
            take: PAGE_SIZE,
            orderBy:{
                createdAt: "desc",
            },
        }),
        prisma.project.count({ where }),
    ])
    return{
        ok: true,
        projects,
        total,
        error: null,
    }
} catch (error) {
    console.error(error)

    return{
        ok: false,
        projects: [],
        total: 0,
        error: "Impossible de récupérer le projet."
    }
   }
}