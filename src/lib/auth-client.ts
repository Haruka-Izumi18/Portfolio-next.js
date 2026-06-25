import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    plugins: [
        adminClient()  
    ]
})
console.log("NEXT_PUBLIC_APP_URL", process.env.NEXT_PUBLIC_APP_URL);

export const { signIn, signUp, useSession } = authClient