"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/login-form";
import { SingupFormComponent } from "@/components/signup-form";
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ADMIN_ROLE = "admin" as const;

export default function LoginPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    const r = session?.user?.role;
    if (!r || !ADMIN_ROLE.includes(r as (typeof ADMIN_ROLE)[number])) {
      return;
    }
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signInForm.password !== signUpForm.confirmPassword){
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    const { data, error } = await authClient.signUp.email({
      name: signUpForm.name,
      email: signUpForm.email,
      password: signUpForm.password,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    router.push("/admin/dashboard");
  }

  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="overview" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="singIn">Connexion</TabsTrigger>
          <TabsTrigger value="singUp">Inscription</TabsTrigger>
        </TabsList>
        <TabsContent value="singIn">
          <Card>
            <CardHeader>
              <CardTitle>Connexion</CardTitle>
              <CardDescription>
                Connectez pour accéder à la page d&apos;admin
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
             <LoginForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="singUp">
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
