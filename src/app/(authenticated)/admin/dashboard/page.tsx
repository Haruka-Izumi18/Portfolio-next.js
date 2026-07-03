import { Suspense } from "react";

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center text-sm text-muted-foreground">
          Chargement…
        </div>
      }
    >
    </Suspense>
  );
}

