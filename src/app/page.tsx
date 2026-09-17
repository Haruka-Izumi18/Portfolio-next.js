import Image from "next/image";
import Link from "next/link";
import RealizationItem from "@/app/(unauthenticated)/_components/realizationItem";
import Profil from "@/app/(unauthenticated)/_components/profil";
import { Mail } from "lucide-react";
import { getHomeProjects } from "./(unauthenticated)/home.action";

export default async function Home() {
  const result = await getHomeProjects();
  const project = result.success ? result.data : [];

  return (
    <>
      <header className="flex flex-row flex-wrap w-full max-w-5xl items-center justify-center sm:justify-between gap-4 sm:gap-0 pb-10 sm:pb-20 text-center">
        <a href="#realization" className="hover:underline text-sm sm:text-lg font-medium">
          Réalisations
        </a>
        <a href="#about" className="hover:underline text-sm sm:text-lg font-medium">
          À propos
        </a>
        <a href="#contact" className="hover:underline text-sm sm:text-lg font-medium">
          Contactez-moi
        </a>
      </header>

      <main className="flex w-full max-w-5xl flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-1">
        <div className="flex flex-1 flex-col gap-2 sm:gap-4 text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold dark:text-zinc-50">
            Développeuse Web <br /> Full Stack
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight dark:text-zinc-50">
            Haruka IZUMI
          </h2>
        </div>
        <div className="relative flex-shrink-0 w-full h-[200px] sm:h-[260px] lg:w-[480px] lg:h-[320px]">
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
        className="flex flex-col items-center justify-center pt-10 px-4"
      >
        <div
          className="mx-auto mt-4 flex items-center justify-center gap-3 sm:gap-10"
          aria-hidden="true"
        >
          <span className="h-[2px] w-6 sm:w-10 bg-[var(--secondary)]/35"></span>
          <h2 className="text-xl sm:text-2xl font-bold leading-10 tracking-tight dark:text-zinc-50 pb-3">
            Réalisations
          </h2>
          <span className="h-[2px] w-6 sm:w-10 bg-[var(--secondary)]/35"></span>
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
                key={project.id}
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
        className="flex flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-14 md:py-20"
      >
        <div
          className="mx-auto mt-4 flex w-full max-w-xs items-center justify-center gap-3 sm:max-w-md sm:gap-6 md:max-w-lg md:gap-10"
          aria-hidden="true"
        >
          <span className="h-[2px] flex-1 max-w-6 bg-[var(--secondary)]/35 sm:max-w-8 md:max-w-10"></span>
          <h2 className="whitespace-nowrap text-lg font-bold leading-10 tracking-tight dark:text-zinc-50 pb-3 sm:text-xl md:text-2xl">
            À propos
          </h2>
          <span className="h-[2px] flex-1 max-w-6 bg-[var(--secondary)]/35 sm:max-w-8 md:max-w-10"></span>
        </div>
        <Profil />
      </section>

      <section id="contact" className="items-center justify-center pt-10 px-4">
        
          <a href="mailto:haruka.izumi18&#64;gmail.com"
          className="inline-flex items-center gap-2 sm:gap-3 bg-[var(--secondary)] rounded-full sm:rounded-[2vw] shadow px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-white font-semibold hover:opacity-90 active:scale-90">
          <Mail size={18} className="sm:hidden" />
          <Mail size={20} className="hidden sm:block" />
          <span>Contactez-moi</span>
        </a>
      </section>

      <footer className="w-full flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-5 py-6 px-4 text-center">
        <p className="text-base sm:text-xl font-normal">&copy;Haruka IZUMI - 2026</p>
        <div className="hover:underline text-sm sm:text-base">
          <Link href="/login">Espace Admin</Link>
        </div>
      </footer>
    </>
  );
}