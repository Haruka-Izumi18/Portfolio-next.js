import Image from "next/image";
import Link from "next/link";
import RealizationItem from "@/app/(unauthenticated)/_components/realizationItem";
import Profil from "@/app/(unauthenticated)/_components/profil";
import { Mail } from "lucide-react";
import { getHomeProjects } from "./home.action";

export default async function Home() {
  const result = await getHomeProjects();
  const project = result.success ? result.data : [];

  return (
    <>
      <header className="flex flex-row w-full max-w-5xl items-center justify-between pb-20">
        <a href="#realization" className="hover:underline text-lg font-medium">
          Réalisations
        </a>
        <a href="#about" className="hover:underline text-lg font-medium">
          À props
        </a>

        <a href="#contact" className="hover:underline text-lg font-medium">
          Contactez-moi
        </a>
      </header>

      <main className="flex w-full max-w-5xl flex-col lg:flex-row items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-4 text-left">
          <h1 className="text-4xl font-semibold dark:text-zinc-50">
            Développeuse Web <br /> Full Stack
          </h1>
          <h2 className="text-4xl font-bold tracking-tight dark:text-zinc-50">
            Haruka IZUMI
          </h2>
        </div>
        <div className="relative flex-shrink-0 w-full h-[260px] lg:w-[480px] lg:h-[320px]">
          <Image
            src="/mac-code.webp"
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover rounded-lg"
            alt="ordinateur"
          />
        </div>
      </main>
      <section
        id="realization"
        className="flex flex-col items-center justify-center pt-10"
      >
        <div
          className="mx-auto mt-4 flex items-center justify-center gap-10"
          aria-hidden="true"
        >
          <span className="h-[2px] w-10 bg-[var(--secondary)]/35"></span>
          <h2 className="text-2xl font-bold leading-10 tracking-tight dark:text-zinc-50 pb-3">
            Réalisations
          </h2>
          <span className="h-[2px] w-10 bg-[var(--secondary)]/35"></span>
        </div>

        {!result.success && (
          <p className="text-center text-red-500">{result.error}</p>
        )}
        {result.success && project.length == 0 && (
          <p className="text-center text-muted-foreground py-10">
            De nouveaux projets arrivent bientôt
          </p>
        )}
        {project.length > 0 && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {project.map((project, index) => (
              <RealizationItem
                key={project.title}
                title={project.title}
                image={project.image}
                discription={project.description}
                url={project.demoUrl}
                animationIndex={index}
              />
            ))}
          </div>
        )}
      </section>
      <section
        id="about"
        className="flex flex-col items-center justify-center pt-10"
      >
        <div
          className="mx-auto mt-4 flex items-center justify-center gap-10"
          aria-hidden="true"
        >
          <span className="h-[2px] w-10 bg-[var(--secondary)]/35"></span>
          <h2 className="text-2xl font-bold leading-10 tracking-tight dark:text-zinc-50 pb-3">
            À props
          </h2>
          <span className="h-[2px] w-10 bg-[var(--secondary)]/35"></span>
        </div>
        <Profil />
      </section>

      <section id="contact" className="items-center justify-center pt-10">
        <a
          href="mailto:haruka.izumi18&#64;gmail.com"
          className="inline-flex items-center gap-3 bg-[var(--secondary)] rounded-[2vw] shadow px-6 py-3 text-white font-semibold hover:opacity-90 hover:scale-100 active:scale-90"
        >
          <Mail size={20} />
          <span>Contactez-moi</span>
        </a>
      </section>

      <footer className="w-full flex flex-row justify-center items-center gap-5 py-6">
        <p className="text-xl font-normal pl-2">&copy;Haruka IZUMI - 2026</p>
        <div className="hover:underline">
          <Link href="/login">Espace Admin</Link>
        </div>
      </footer>
    </>
  );
}
