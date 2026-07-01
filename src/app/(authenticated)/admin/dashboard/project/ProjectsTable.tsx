"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Project } from "../../../../../../generated/prisma/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const PAGE_SIZE = 10;

type Props = {
  projects: Project[];
  total: number;
  page: number;
  search: string;
  loadError: string | null;
};

function formatMinutesShort(seconds: number | null): string {
  if (seconds == null || !Number.isFinite(seconds)) {
    return "—";
  }
  return `${Math.max(1, Math.round(seconds / 60))} min`;
}

export default function ProjectsTable({
  projects,
  total,
  page,
  search,
  loadError,
}: Props) {
  const router = useRouter();
  //const caps = useAdminCapabilities()
  const [searchInput, setSearchInput] = useState(search);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  /* useEffect(() => {
    setSearchInput(search)
  }, [search]) */

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
    router.push(`/admin/dashboard/project?${params.toString()}`);
  }, [debouncedSearch, router, search]);

  useEffect(() => {
    if (loadError) toast.error(loadError);
  }, [loadError]);

  const totalPages = total > 0 ? Math.max(1, Math.ceil(total / PAGE_SIZE)) : 1;
  const canPrev = page > 1;
  const canNext = page < totalPages;
  const showEmptyState = !loadError && projects.length === 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          type="search"
          placeholder="Rechercher par nom du project"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="max-w-sm"
          aria-label="Rechercher une project"
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
              router.push(`/admin-game/dashboard/project?${params.toString()}`);
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
              router.push(`/admin/dashboard/project?${params.toString()}`);
            }}
          >
            Suivant
          </Button>
        </div>
      </div>
      <h1>Liste des projects</h1>
      <div className="p-4">
        {loadError ? (
          <div className="rounded-lg border border-dashed p-10 text-center">
            <p className="text-sm font-medium">
              Erreur lors du chargement des projects
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
            <p className="text-sm font-medium">Aucune project pour le moment</p>

            <div className="mt-6 flex flex-wrap justify-center gap-2"></div>
          </div>
        ) : (
          <Table className="m-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">titre</TableHead>
                <TableHead className="text-left">URL</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="text-left font-medium">
                    {project.title}
                  </TableCell>
                  <TableCell className="text-left">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 text-muted-foreground hover:text-foreground"
                    >
                      {project.demoUrl}
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/dashboard/project/${project.id}`}>
        <Button
          type="button"
          variant="outline"
          size="sm"
        >
          Voir détail
        </Button>
        </Link>
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
