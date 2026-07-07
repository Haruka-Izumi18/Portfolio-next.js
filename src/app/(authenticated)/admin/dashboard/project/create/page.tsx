"use client";
import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
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
import { createProject } from "@/lib/actions/create-project";
import Image from "next/image";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Le titre doit comporter au moins 5 caractères.")
    .max(100, "Le titre doit comporter au maximum 100 caractères."),
  description: z
    .string()
    .min(20, "Le titre doit comporter au moins 20 caractères.")
    .max(2048, "Description must be at most 2048 characters.")
    .optional()
    .default(""),
  image: z.string().max(2048).optional().default(""),
  demoUrl: z.string().max(2048).default(""),
});

type FormValues = z.infer<typeof formSchema>;

const FORM_FIELD_ORDER: (keyof FormValues)[] = [
  "title",
  "description",
  "image",
  "demoUrl",
];
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
export default function Page() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      demoUrl: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image.")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image dépasse 5 Mo.")
      return
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

    const removeImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImageFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: FormValues) => {
    try {
      let imageUrl = data.image || ""

      if (imageFile) {
        setIsUploading(true)
        const uploadForm = new FormData()
        uploadForm.append("file", imageFile)

        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadForm,
        })
        const result = await res.json()
        if (!res.ok) {
          toast.error(result.error || "Erreur lors de l'upload de l'image.")
          setIsUploading(false)
          return
        }
        imageUrl = result.url
        setIsUploading(false)
      }

      const result = await createProject({
        title: data.title,
        description: data.description,
        image: imageUrl || undefined,
        demoUrl: data.demoUrl,
      })

      if (!result.success) {
        toast.error(result.error)
        return
      }
      toast.success("Project créée.")
      router.push("/admin/dashboard/project/" + result.id)
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Erreur lors de la création."
      toast.error(msg)
    }
  }

  return (
    <div className="w-full">
      <Card className="p-5">
        <form onSubmit={form.handleSubmit(onSubmit, scrollToFirstInvalidField)}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Créer un projet</FieldLegend>
              <FieldGroup>
                <Field data-invalid={!!form.formState.errors.title}>
                  <FieldLabel htmlFor="title">
                    titre du projet
                  </FieldLabel>
                  <Input
                    id="title"
                    placeholder="Titre du projet"
                    {...form.register("title")}
                  />
                  <FieldError errors={[form.formState.errors.title]} />
                </Field>
                <Field data-invalid={!!form.formState.errors.image}>
                  <FieldLabel htmlFor="image">
                    Image
                  </FieldLabel>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  {previewUrl && (
                    <div className="relative mt-2 h-40 w-40">
                      <Image
                        src={previewUrl}
                        alt="Aperçu"
                        fill
                        className="rounded-md object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 text-xs text-white"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  <FieldError errors={[form.formState.errors.image]} />
                </Field>
                <Field data-invalid={!!form.formState.errors.demoUrl}>
                  <FieldLabel htmlFor="demoUrl">
                    URL
                  </FieldLabel>
                  <Input
                    id="demoUrl"
                    placeholder="https://"
                    {...form.register("demoUrl")}
                  />
                  <FieldError errors={[form.formState.errors.image]} />
                </Field>
                <Field data-invalid={!!form.formState.errors.description}>
                  <FieldLabel htmlFor="description">
                    Description
                  </FieldLabel>
                  <Textarea
                    id="description"
                    className="resize-none"
                    {...form.register("description")}
                  />
                </Field>
                <FieldError errors={[form.formState.errors.description]} />
              </FieldGroup>
            </FieldSet>

            <Field orientation="horizontal">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Création..." : "Créer"}
                </Button>
              <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}>
                Annuler
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </Card>
    </div>
  );
}
