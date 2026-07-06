import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { isGoogleSignInConfigured } from "@/lib/google-oauth-public";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export type GoogleSignInButtonProps = {
  callbackURL?: string;
  disabled?: boolean;
  label?: string;
  className?: string;
};

export function GoogleSignInButton({
  callbackURL,
  disabled,
  label = "Continuer avec Google",
  className,
}: GoogleSignInButtonProps) {
  const [pending, setPending] = useState(false);

  if (!isGoogleSignInConfigured()) return null;

  const handleClick = async () => {
    setPending(true);
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL,
    });
    setPending(false);
    if (error) toast.error(error.message ?? "Connexion avec Google impossible.");
  };

  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        "w-full gap-2.5 border-zinc-200 bg-white text-foreground hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-900",
        className
      )}
      disabled={disabled || pending}
      onClick={handleClick}
    >
      <Image
        src="/icons8-logo-google-48.png"
        height={20}
        width={20}
        className="mr-2 object-contain"
        alt="google"
      />
      {pending ? "Redirection…" : label}
    </Button>
  );
}
