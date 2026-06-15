import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
      <main className="flex w-full max-w-5xl flex-col py-20 px-16 font-sans dark:bg-black">
       <div className="flex flex-row w-full items-center justify-between pb-20">
              <a href="#realization">
                Réalisation
              </a>
              <a href="#about">
                À props
              </a>
              <a href="#links">
               Liens
              </a>
              <a href="#contact">
                Contactez-moi
              </a>
              </div>
        
        <div className="flex w-full flex-col lg:flex-row items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-4 text-left">
            <h1 className="text-4xl font-semibold dark:text-zinc-50">
              Développeuse Web <br />Full Stack
            </h1>
            <h2 className="text-4xl font-bold leading-10 tracking-tight dark:text-zinc-50">
              Haruka IZUMI
            </h2>
          </div>
          <div className="flex-shrink-0">
            <Image
              src="/mac-code.webp"
              width={300}
              height={200}
              className="object-cover rounded-lg"
              alt="ordinateur"
            />
          </div>
        </div>
     <section id="realization">
      Réalisations
     </section>
     <section id="about">
      À props
     </section>
     <section id="links">
      Liens
     </section>
     <section id="contact">
      Contactez-moi
     </section>
      </main>
  );
}
