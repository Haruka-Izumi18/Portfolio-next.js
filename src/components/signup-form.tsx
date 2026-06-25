"use client"

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"

type SingupFormProis = {
  className?: string
  signUpForm: {
    name: string
    email: string
    password: string
    confirmPassword: string
  }
  setSignUpForm: React.Dispatch<
    React.SetStateAction<{
      name: string
      email: string
      password: string
      confirmPassword: string
    }>
  >
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => void
  loading: boolean
  oautCallbackURL?: string
}

export function SingupFormComponent({
  signUpForm,
  setSignUpForm,
  handleSignUp,
  loading,
  oautCallbackURL,
}: SingupFormProis){

    return(
        <form onSubmit={handleSignUp}>
                <FieldGroup>
                  <FieldSet>
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="signup-name">
                          Nom
                        </FieldLabel>
                        <Input
                          id="signup-name"
                          placeholder="Votre nom"
                          value={signUpForm.name}
                          onChange={(e) => setSignUpForm((f) => ({ ...f, name: e.target.value }))}
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="signup-email">
                          Email
                        </FieldLabel>
                        <Input
                          id="signup-email"
                          placeholder="exemple@mail.com"
                          value={signUpForm.email}
                          onChange={(e) => setSignUpForm((f) => ({ ...f, email: e.target.value }))}
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="signup-password">
                          Mot de passe
                        </FieldLabel>
                        <Input
                          id="signup-password"
                          placeholder="Mot de passe"
                          value={signUpForm.password}
                          onChange={(e) => setSignUpForm((f) => ({ ...f, password: e.target.value }))}
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="signup-confirmPassword">
                          Confirmez le mot de passe
                        </FieldLabel>
                        <Input
                          id="signup-confirmPassword"
                          placeholder="Mot de passe"
                          value={signUpForm.confirmPassword}
                          onChange={(e) => setSignUpForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                          required
                        />
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                  <Field orientation="horizontal">
                    <Button type="submit">Crée le compte</Button>
                    <Button variant="outline" type="button">
                      Annulé
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
    )
}