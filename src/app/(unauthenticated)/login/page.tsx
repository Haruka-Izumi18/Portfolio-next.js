"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInFormComponent } from "@/components/signin-form";
import { SingupFormComponent } from "@/components/signup-form";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ADMIN_ROLE = "admin" as const;

export default function LoginPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    const r = session?.user?.role;
    if (r !== "admin") 
      return;
    router.replace("/admin/dashboard");
  }, [session, router]);

  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await authClient.signIn.email({
      email: signInForm.email,
      password: signInForm.password,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    const { data: sessionData } = await authClient.getSession();
    if (sessionData?.user?.role !== ADMIN_ROLE){
      await authClient.signOut();
      toast.error("Accès réservé aux administrateurs");
      return;
    }
    setLoading(false);
    router.push("/admin/dashboard");
  }

  const handleSignUp = async (e: React.FormEvent) => {
    console.log("APP_URL =", process.env.NEXT_PUBLIC_APP_URL);
console.log("window.origin =", window.location.origin);
    e.preventDefault();
    if (signUpForm.password !== signUpForm.confirmPassword){
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    const { data, error } = await authClient.signUp.email({
      name: signUpForm.name,
      email: signUpForm.email,
      password: signUpForm.password,
      callbackURL: "/admin/dashboard",
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    await authClient.signOut();
    toast.success("Compte créé. Cette page est uniquement accessible aux administrateurs.")
    router.push("/admin/dashboard");
  }

  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="signIn" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="signIn">Connexion</TabsTrigger>
          <TabsTrigger value="signUp">Inscription</TabsTrigger>
        </TabsList>
        <TabsContent value="signIn">
          <Card>
            <CardHeader>
              <CardTitle>Connexion</CardTitle>
              <CardDescription>
                Connectez pour accéder à la page d&apos;admin
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
             <SignInFormComponent
             signInForm={signInForm}
               setSignInForm={setSignInForm}
               handleSignIn={handleSignIn}
               loading={loading}
               oauthCallbackURL="/admin/dashboard" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signUp">
          <Card>
            <CardHeader>
              <CardTitle>Inscription</CardTitle>
              <CardDescription>
                Inscrivez-vous pour accéder à la page d&apos;admin
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
               <SingupFormComponent
               signUpForm={signUpForm}
               setSignUpForm={setSignUpForm}
               handleSignUp={handleSignUp}
               loading={loading}
               oautCallbackURL="/admin/dashboard" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
