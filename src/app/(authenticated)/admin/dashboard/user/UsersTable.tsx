"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import type { User } from "../../../../../../generated/prisma/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { updateUserRole } from "./user.action";
import { AVAILABLE_ROLES, type UserRole } from "@/lib/user/roles";
import DeleteUserDialog  from "./_components/DeleteUserDialog";

const PAGE_SIZE = 10;

type Props = {
  users: User[];
  total: number;
  page: number;
  search: string;
  loadError: string | null;
};

export default function UsersTable({
  users,
  total,
  page,
  search,
  loadError,
}: Props) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(search);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    if (debouncedSearch === search) return;
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    params.set("page", "1");
    router.push(`/admin/dashboard/user?${params.toString()}`);
  }, [debouncedSearch, router, search]);

  useEffect(() => {
    if (loadError) toast.error(loadError);
  }, [loadError]);

  const totalPages = total > 0 ? Math.max(1, Math.ceil(total / PAGE_SIZE)) : 1;
  const canPrev = page > 1;
  const canNext = page < totalPages;
  const showEmptyState = !loadError && users.length === 0;

  const handleRoleChange = (userId: string, role: UserRole) => {
    setPendingUserId(userId);
    startTransition(async () => {
        const result = await updateUserRole(userId, role);
        setPendingUserId(null);
        if (!result.success) {
            toast.error(result.error);
            return;
        }
        toast.success("Rôle mis à jour");
        router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          type="search"
          placeholder="Rechercher par nom du user"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="max-w-sm"
          aria-label="Rechercher une utilisateur"
          autoComplete="off"
        />
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!canPrev}
            onClick={() => {
              const params = new URLSearchParams();
              if (search) params.set("search", search);
              params.set("page", String(Math.max(1, page - 1)));
              router.push(`/admin-game/dashboard/user?${params.toString()}`);
            }}
          >
            Précédent
          </Button>
          <span
            className="min-w-[120px] text-center tabular-nums"
            aria-live="polite"
          >
            <>
              Page {page} sur {totalPages}
            </>
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!canNext}
            onClick={() => {
              const params = new URLSearchParams();
              if (search) params.set("search", search);
              params.set("page", String(page + 1));
              router.push(`/admin/dashboard/user?${params.toString()}`);
            }}
          >
            Suivant
          </Button>
        </div>
      </div>
      <h1>Liste des utilisateurs</h1>
      <div className="p-4">
        {loadError ? (
          <div className="rounded-lg border border-dashed p-10 text-center">
            <p className="text-sm font-medium">
              Erreur lors du chargement des utilisateurs
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{loadError}</p>
            <div className="flex justify-center">
              <Button type="button" onClick={() => router.refresh()}>
                Réessayer
              </Button>
            </div>
          </div>
        ) : showEmptyState ? (
          <div className="rounded-lg border border-dashed p-10 text-center">
            <p className="text-sm font-medium">Aucune utilisateur pour le moment</p>

            <div className="mt-6 flex flex-wrap justify-center gap-2"></div>
          </div>
        ) : (
          <Table className="m-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Nom</TableHead>
                <TableHead className="text-left">Rôle</TableHead>
                <TableHead className="text-left">Email</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="text-left font-medium">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-left">
                    {user.email}
                  </TableCell>
                  <TableCell className="text-left">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 capitalize"
                          disabled={isPending && pendingUserId === user.id}
                        >
                          {isPending && pendingUserId === user.id
                            ? "..."
                            : user.role ?? "user"}
                          <ChevronDownIcon className="size-3" />
                        </Button>
                        </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {AVAILABLE_ROLES.map((role) => (
                          <DropdownMenuItem
                            key={role}
                            disabled={user.role === role}
                            onClick={() => handleRoleChange(user.id, role)}
                            className="capitalize"
                          >
                            {role}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                      </DropdownMenu>
                  </TableCell>
                  <TableCell className="text-right">
                    <DeleteUserDialog
                        userId={user.id}
                        userName={user.name}
                        userEmail={user.email}
                      />
        </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
