"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
//import { useAdminCapabilities } from "../AdminCapabilitiesProvider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Project } from "../../../../../../generated/prisma/client";
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
//import { RequestNewAdventureDialog } from "./RequestNewAdventureDialog"
/* import {
  adventureAudienceLabel,
  type AdventureAudienceFormValue,
} from "@/lib/adventure-audience" */

const PAGE_SIZE = 10

type Props = {
  projects: Project[]
  total: number
  page: number
  search: string
  loadError: string | null
}

function formatMinutesShort(seconds: number | null): string {
  if (seconds == null || !Number.isFinite(seconds)) {
    return "—"
  }
  return `${Math.max(1, Math.round(seconds / 60))} min`
}

export default function ProjectsTable({
  projects,
  total,
  page,
  search,
  loadError,
}: Props) {
  const router = useRouter()
  //const caps = useAdminCapabilities()
  const [searchInput, setSearchInput] = useState(search)
  const [debouncedSearch, setDebouncedSearch] = useState("")

 /* useEffect(() => {
    setSearchInput(search)
  }, [search]) */

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchInput.trim())
    }, 400)
    return () => clearTimeout(t)
  }, [searchInput])

  useEffect(() => {
    if (debouncedSearch === search) return
    const params = new URLSearchParams()
    if (debouncedSearch) params.set("search", debouncedSearch)
    params.set("page", "1")
    router.push(`/admin/dashboard/project?${params.toString()}`)
  }, [debouncedSearch, router, search])

  useEffect(() => {
    if (loadError) toast.error(loadError)
  }, [loadError])

  const totalPages = total > 0 ? Math.max(1, Math.ceil(total / PAGE_SIZE)) : 1
  const canPrev = page > 1
  const canNext = page < totalPages
  const showEmptyState = !loadError && projects.length === 0

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
              const params = new URLSearchParams()
              if (search) params.set("search", search)
              params.set("page", String(Math.max(1, page - 1)))
              router.push(`/admin-game/dashboard/project?${params.toString()}`)
            }}
          >
            Précédent
          </Button>
          <span className="min-w-[120px] text-center tabular-nums" aria-live="polite">
            <>Page {page} sur {totalPages}</>
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!canNext}
            onClick={() => {
              const params = new URLSearchParams()
              if (search) params.set("search", search)
              params.set("page", String(page + 1))
              router.push(`/admin/dashboard/project?${params.toString()}`)
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
            <p className="text-sm font-medium">Erreur lors du chargement des projects</p>
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
            {/* <p className="mt-1 text-sm text-muted-foreground">
              {caps.adventure.create
                ? "Créez la première project pour démarrer."
                : "Les projects qui vous sont assignées apparaîtront ici. Pour en ajouter une nouvelle, envoyez une demande au super administrateur."}
            </p> */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
             {/* <GuardedButton
                type="button"
                allowed={caps.adventure.create}
                denyReason="Vous ne pouvez pas créer une project."
                onClick={() => router.push("/admin-game/dashboard/projects/create")}
              >
                Créer la première project
              </GuardedButton>
              {!caps.adventure.create ? (
                <RequestNewAdventureDialog size="default" />
              ) : null} */}
            </div>
          </div>
        ) : (
          <Table className="m-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Nom</TableHead>
                <TableHead className="text-left">Ville</TableHead>
                <TableHead className="text-left">Visibilité</TableHead>
                <TableHead className="text-left">Statut</TableHead>
                <TableHead className="text-left whitespace-normal">Durée estim.</TableHead>
                <TableHead className="text-left whitespace-normal">Moy. joueurs</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {adventures.map((adventure) => (
                <TableRow key={adventure.id}>
                  <TableCell className="text-left">{adventure.name}</TableCell>
                  <TableCell className="text-left">{adventure.city}</TableCell>
                  <TableCell className="text-left">
                    <span className="text-muted-foreground">
                      {adventureAudienceLabel(adventure.audience)}
                    </span>
                  </TableCell>
                  <TableCell className="text-left">
                    {adventure.status ? (
                      <span className="text-muted-foreground">Active</span>
                    ) : (
                      <span className="text-destructive">Pause</span>
                    )}
                  </TableCell>
                  <TableCell className="max-w-[7rem] text-left text-xs tabular-nums text-muted-foreground">
                    {formatMinutesShort(adventure.estimatedPlayDurationSeconds)}
                  </TableCell>
                  <TableCell className="max-w-[8rem] text-left text-xs tabular-nums text-muted-foreground">
                    <span>{formatMinutesShort(adventure.averagePlayDurationSeconds)}</span>
                    {adventure.playDurationSampleCount > 0 ? (
                      <span className="block text-[10px] opacity-90">n = {adventure.playDurationSampleCount}</span>
                    ) : null}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon />
                          <span className="sr-only">Ouvrir le menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          disabled={!caps.adventure.read}
                          title={
                            !caps.adventure.read
                              ? "Vous ne pouvez pas ouvrir le détail de cette project."
                              : undefined
                          }
                          onClick={() => {
                            if (!caps.adventure.read) return;
                            router.push(`/admin-game/dashboard/projects/${adventure.id}`)
                          }}
                        >
                          Voir le détail
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}

