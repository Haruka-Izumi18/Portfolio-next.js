"use client"

import { useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldError,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { updateProject, deleteProject } from "@/lib/actions/update-delete-project";

type Project = {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  demoUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Le titre doit comporter au moins 5 caractères.")
    .max(100, "Le titre doit comporter au maximum 100 caractères."),
  description: z
    .string()
    .max(2048, "Description must be at most 2048 characters.")
    .default(""),
  image: z.string().max(2048).default(""),
  demoUrl: z.string().max(2048).default(""),
});

type FormValues = z.output<typeof formSchema>;

const FORM_FIELD_ORDER: (keyof FormValues)[] = ["title", "description", "image", "demoUrl"];

function scrollToFirstInvalidField(errors: FieldErrors<FormValues>) {
  for (const key of FORM_FIELD_ORDER) {
    if (!errors[key]) continue;
    const el = document.getElementById(String(key));
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      el.focus({ preventScroll: true });
    }
    break;
  }
}

export default function ProjectDetail({ project }: { project: Project }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<z.input<typeof formSchema>, undefined, z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: project.title,
      description: project.description ?? "",
      image: project.image ?? "",
      demoUrl: project.demoUrl,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const result = await updateProject(project.id, {
      title: data.title,
      description: data.description,
      image: data.image || undefined,
      demoUrl: data.demoUrl,
    });

    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("Projet mis à jour.");
    setIsEditing(false);
    router.refresh();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteProject(project.id);
    setIsDeleting(false);

    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("Projet supprimé.");
    router.push("/admin/dashboard");
  };

  return (
    <div className="w-full">
      <Card className="p-5">
        {!isEditing ? (
         <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <h1 className="text-2xl font-bold">{project.title}</h1>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Modifier
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Supprimer</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Supprimer ce projet ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action est irréversible. Le projet « {project.title} » sera
                        définitivement supprimé.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? "Suppression..." : "Supprimer"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {project.image && (
              <div className="relative h-64 w-full max-w-md">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
            )}

            <p className="text-muted-foreground whitespace-pre-wrap">
              {project.description || "Aucune description."}
            </p>

            
             <a href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-4"
            >
              {project.demoUrl}
            </a>

            <p className="text-xs text-muted-foreground">
              Créé le {new Date(project.createdAt).toLocaleDateString("fr-FR")} · Mis à jour le{" "}
              {new Date(project.updatedAt).toLocaleDateString("fr-FR")}
            </p>
          </div>
        ) : (
            <form onSubmit={form.handleSubmit(onSubmit, scrollToFirstInvalidField)}>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Modifier le projet</FieldLegend>
                <FieldGroup>
                  <Field data-invalid={!!form.formState.errors.title}>
                    <FieldLabel htmlFor="title">Titre du projet</FieldLabel>
                    <Input id="title" {...form.register("title")} />
                    <FieldError errors={[form.formState.errors.title]} />
                  </Field>

                  <Field data-invalid={!!form.formState.errors.image}>
                    <FieldLabel htmlFor="image">Image (URL)</FieldLabel>
                    <Input id="image" placeholder="https://" {...form.register("image")} />
                    <FieldError errors={[form.formState.errors.image]} />
                  </Field>

                  <Field data-invalid={!!form.formState.errors.demoUrl}>
                    <FieldLabel htmlFor="demoUrl">URL</FieldLabel>
                    <Input id="demoUrl" placeholder="https://" {...form.register("demoUrl")} />
                    <FieldError errors={[form.formState.errors.demoUrl]} />
                  </Field>

                  <Field data-invalid={!!form.formState.errors.description}>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Textarea id="description" className="resize-none" {...form.register("description")} />
                    <FieldError errors={[form.formState.errors.description]} />
                  </Field>
                </FieldGroup>
              </FieldSet>

              <Field orientation="horizontal">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Enregistrement..." : "Enregistrer"}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    form.reset();
                    setIsEditing(false);
                  }}
                >
                  Annuler
                </Button>
              </Field>
            </FieldGroup>
          </form>
        )}
      </Card>
    </div>
  );
}
