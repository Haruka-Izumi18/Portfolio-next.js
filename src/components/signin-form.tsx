"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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
              <FieldLabel htmlFor="password">
                Mot de passe
              </FieldLabel>
              <Input
                id="password"
                placeholder="Mot de passe"
                value={signInForm.password}
                type="password"
                onChange={(e) =>
                  setSignInForm({ ...signInForm, password: e.target.value })
                }
                required
              />
      
            </Field>
          </FieldGroup>
        </FieldSet>
        <Field orientation="horizontal">
          <Button type="submit">Connexion</Button>
          <Button variant="outline" type="button">
            Annulé
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
