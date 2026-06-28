import Image from "next/image";
import Link from "next/link";
import RealizationItem from "@/components/realizationItem";
import Profil from "@/components/profil";
import { Mail } from "lucide-react";

export default function Home() {
  const realization = [
    {
      title: "BlablaBook",
      image: "blablabook.png",
      discription:
        "Plateforme communautaire permettant de découvrir, partager et recommander des livres. Les utilisateurs peuvent créer un compte, rechercher des ouvrages et interagir avec la communauté.",
      url: "https://blablabook-haruka.vercel.app/",
      animationIndex: 1,
    },
  ];

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
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {realization.map((item, index) => (
          <RealizationItem key={item.title} {...item} animationIndex={index} />
        ))}
        </div>
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
          className="flex items-center gap-3 hover:text-[var(--secondary)] transition-colors"
        >
          <Mail />
          <h2 className="text-2xl font-bold">Contactez-moi</h2>
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
