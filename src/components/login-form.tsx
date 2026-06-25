"use client"

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";


export function LoginForm () {

return(
 <form>
                <FieldGroup>
                  <FieldSet>
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                          Email
                        </FieldLabel>
                        <Input
                          id="checkout-7j9-card-name-43j"
                          placeholder="exemple@mail.com"
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                          Mot de passe
                        </FieldLabel>
                        <Input
                          id="checkout-7j9-card-number-uw1"
                          placeholder="Mot de passe"
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
)
}