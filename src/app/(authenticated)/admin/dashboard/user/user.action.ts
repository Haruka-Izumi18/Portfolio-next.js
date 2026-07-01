"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { AVAILABLE_ROLES, type UserRole } from "@/lib/user/roles";

const PAGE_SIZE = 10

export async function getUsers(page: number, search: string){
   try {
    const where = search
    ? {
        OR: [
            { name: { condition: search, mode: "insensitive" as const }},
            { email: { condition: search, mode: "insensitive" as const }},
        ],
        }
    : {}
    const [users, total] = await Promise.all([
        prisma.user.findMany({
            where,
            skip: (page - 1 ) * PAGE_SIZE,
            take: PAGE_SIZE,
            orderBy:{
                createdAt: "desc",
            },
        }),
        prisma.user.count({ where }),
    ])
    return{
        ok: true,
        users,
        total,
        error: null,
    }
} catch (error) {
    console.error(error)

    return{
        ok: false,
        users: [],
        total: 0,
        error: "Impossible de récupérer ce user."
    }
   }
}

export async function updateUserRole(
  userId: string,
  role: UserRole
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return { success: false, error: "Non authentifié." };
    }
    if (session.user.id === userId) {
      return { success: false, error: "Vous ne pouvez pas modifier votre propre rôle." };
    }
    if (!AVAILABLE_ROLES.includes(role)) {
      return { success: false, error: "Rôle invalide." };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    revalidatePath("/admin/dashboard/user");

    return { success: true };
  } catch (error) {
    console.error("updateUserRole error:", error);
    return { success: false, error: "Erreur lors de la mise à jour du rôle." };
  }
}