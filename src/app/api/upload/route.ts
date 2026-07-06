import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Format d'image non supporté." }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "L'image dépasse 5 Mo." }, { status: 400 });

    }
    const blob = await put(file.name, file, {
  access: "public",
});

blob.url;

  } catch (error) {
    console.error("upload error:", error);
    return NextResponse.json({ error: "Erreur lors de l'upload." }, { status: 500 });
  }
}