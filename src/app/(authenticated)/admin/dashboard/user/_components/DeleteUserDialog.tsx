"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { toast } from "sonner";
import { deleteUser } from "../user.action";
import { useRouter } from "next/navigation";

type Props = {
  userId: string;
  userName: string;
  userEmail: string;
};

export default function DeleteUserDialog({ userId, userName, userEmail }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const isConfirmed = confirmText.trim() === userEmail;

  const handleDelete = async () => {
    if (!isConfirmed) {
      toast.error("Le texte saisi ne correspond pas à l'e-mail affiché.");
      return;
    }
    setIsDeleting(true);
    const result = await deleteUser(userId);
    setIsDeleting(false);

    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("Utilisateur supprimé.");
    setOpen(false);
    router.refresh();
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setConfirmText("");
      }}
    >
      <AlertDialogTrigger asChild>
        <Button type="button" variant="destructive" size="sm">
          Supprimer
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer {userName} ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Pour confirmer, saisissez l&apos;adresse e-mail{" "}
            <span className="font-medium text-foreground">{userEmail}</span> ci-dessous.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder={userEmail}
          autoComplete="off"
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={!isConfirmed || isDeleting}
          >
            {isDeleting ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}