import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB


export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user){
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier reçu."}, { status: 400 });
  }
  if (!file?.type.startsWith("image/")){
    return NextResponse.json(
      { error: "Le fichier doit être une image."}, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "L'image dépasse 5 MB." }, { status: 400 });
  }
  try {
    const ext = file.name.includes(".") ? file.name.split(".").pop() : "";
    const filename = `${crypto.randomUUID()}${ext ? "." + ext : "" }`;

    const blob = await put(filename, file, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: true,
    });
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'upload de l'image"},
      { status: 500 }
    );
  }
}