"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

type SingInFormProps = {
  className?: string;
  signInForm: {
    email: string;
    password: string;
  };
  setSignInForm: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >;
  handleSignIn: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  oauthCallbackURL?: string;
};

export function SignInFormComponent({
  className,
  signInForm,
  setSignInForm,
  handleSignIn,
  loading,
  oauthCallbackURL,
}: SingInFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSignIn}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                placeholder="exemple@mail.com"
                value={signInForm.email}
                onChange={(e) =>
                  setSignInForm({ ...signInForm, email: e.target.value })
                }
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Mot de passe"
                  value={signInForm.password}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) =>
                    setSignInForm({ ...signInForm, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </Field>
          </FieldGroup>
        </FieldSet>
        <Field orientation="horizontal">
          <Button type="submit">Connexion</Button>
          <Button variant="outline" type="button">
            Annulé
          </Button>
        </Field>
        <Field>
          <Button
            type="button"
            variant="outline"
            className="w-full border-primary bg-white text-primary hover:bg-primary/5"
            onClick={async () => {
            
              const res = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/admin/dashboard",
              });
              console.log(JSON.stringify(res, null, 2));
           if (res.data?.url) {
  window.location.assign(res.data.url);
}
            }}
          >
            <Image
              src="/icons8-logo-google-48.png"
              height={20}
              width={20}
              className="mr-2 object-contain"
              alt="google"
            />
            Connexion avec Google
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
