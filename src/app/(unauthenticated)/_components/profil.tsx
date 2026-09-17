import Image from "next/image";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Profil() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 justify-center items-center lg:items-start w-full mt-8 sm:mt-10">
        <div className="w-full max-w-[240px] sm:max-w-[350px] lg:max-w-[450px] shrink-0 mx-auto">
          <Image
            src="/HARUKAphotoFrédéricPOLETTI-0406.jpeg"
            width={450}
            height={350}
            className="object-contain rounded-lg shadow-lg w-full h-auto"
            alt="Photo profile"
          />
        </div>
        <div className="flex flex-col gap-6 sm:gap-8 items-center lg:items-start justify-center text-center lg:text-left w-full max-w-xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight dark:text-zinc-50">
            Haruka IZUMI
          </h2>
          <p className="font-normal text-center lg:text-start dark:text-zinc-50 px-2 lg:pl-2 text-sm sm:text-base">
            Développeur Full Stack. Je développe des applications web et mobiles.
            Actuellement en stage, je participe au développement de solutions web
            performantes et maintenables. Je recherche un poste de Développeur
            Full Stack afin de contribuer à des projets innovants tout en
            continuant à développer mes compétences techniques.
          </p>
          <div className="flex flex-row flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start">
            <Link
              href="https://www.linkedin.com/in/haruka-izumi-b1a184397/"
              className="hover:underline"
            >
              <div className="flex flex-row gap-2 items-center">
                <div className="w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] flex items-center justify-center shrink-0">
                  <Image
                    src="/icons8-linkedin-48.png"
                    width={30}
                    height={30}
                    alt="LinkedIn"
                    className="object-contain scale-125"
                  />
                </div>
                <span className="text-lg sm:text-xl font-semibold">LinkedIn</span>
              </div>
            </Link>
            <Link
              href="https://www.linkedin.com/in/haruka-izumi-b1a184397/"
              className="hover:underline"
            >
              <div className="flex flex-row gap-2 items-center">
                <div className="w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] flex items-center justify-center px-6 shrink-0">
                  <Image
                    src="/icons8-github-64.png"
                    width={30}
                    height={30}
                    alt="GitHub"
                    className="object-contain scale-125"
                  />
                </div>
                <span className="text-lg sm:text-xl font-semibold">GitHub</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 mt-10 sm:mt-12 gap-4 sm:gap-6 items-stretch w-full">
        <Card className="shadow-lg p-4 flex flex-col">
          <CardTitle className="text-lg sm:text-xl text-center text-primary font-semibold">
            Langues
          </CardTitle>
          <CardContent className="pt-4 text-center text-primary font-normal text-base sm:text-lg">
            🇫🇷 Francais Indépendant
            <br />
            🇯🇵 Japonais Maternelle
            <br />
            🇬🇧 Anglais Intermédiaire
          </CardContent>
        </Card>

        <Card className="shadow-lg p-4 flex flex-col">
          <CardTitle className="text-lg sm:text-xl text-center text-primary font-semibold">
            Front end
          </CardTitle>
          <CardContent className="pt-4 text-center text-primary font-normal text-base sm:text-lg">
            {[
              ["/icons8-html-48.png", "HTML"],
              ["/icons8-css-48.png", "CSS"],
              ["/icons8-javascript-48.png", "Java Script"],
              ["/icons8-tailwind-css-48.png", "Tailwind CSS"],
              ["/icons8-typescript-48.png", "TypeScript"],
              ["/icons8-next.js-48.png", "Next.js"],
              ["/icons8-svelte-48.png", "Svelte"],
            ].map(([src, label]) => (
              <div className="flex flex-row gap-2 items-center justify-center" key={label}>
                <div className="w-[22px] h-[22px] sm:w-[25px] sm:h-[25px] flex items-center justify-center shrink-0">
                  <Image
                    src={src}
                    width={30}
                    height={30}
                    alt={label}
                    className="object-contain scale-125"
                  />
                </div>
                <span>{label}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-lg p-4 flex flex-col">
          <CardTitle className="text-lg sm:text-xl text-center text-primary font-semibold">
            Back end
          </CardTitle>
          <CardContent className="pt-4 text-center text-primary font-normal text-base sm:text-lg">
            <div className="flex flex-row gap-2 items-center justify-center">
              <div className="w-[22px] h-[22px] sm:w-[25px] sm:h-[25px] flex items-center justify-center shrink-0">
                <Image
                  src="/icons8-nodejs-48.png"
                  width={30}
                  height={30}
                  alt="Nodejs"
                  className="object-contain scale-125"
                />
              </div>
              <span>Node.js</span>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center">
              <div className="w-[22px] h-[22px] sm:w-[25px] sm:h-[25px] flex items-center justify-center shrink-0">
                <Image
                  src="/icons8-postgresql-48.png"
                  width={30}
                  height={30}
                  alt="PostgreSQL"
                  className="object-contain scale-125"
                />
              </div>
              <span>PostgreSQL</span>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-normal dark:text-zinc-50 pl-2">ORM</h3>
              <span>Sequelize, Prisma</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg p-4 flex flex-col">
          <CardTitle className="text-lg sm:text-xl text-center text-primary font-semibold">
            Outis &amp; environnement
          </CardTitle>
          <CardContent className="pt-4 text-center text-primary font-normal text-base sm:text-lg">
            <div className="flex flex-row gap-2 items-center justify-center">
              <div className="w-[22px] h-[22px] sm:w-[25px] sm:h-[25px] flex items-center justify-center shrink-0">
                <Image
                  src="/icons8-github-64.png"
                  width={30}
                  height={30}
                  alt="Git/GitHub"
                  className="object-contain scale-125"
                />
              </div>
              <span>Git/GitHub</span>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center">
              <div className="w-[22px] h-[22px] sm:w-[25px] sm:h-[25px] flex items-center justify-center shrink-0">
                <Image
                  src="/icons8-docker-48.png"
                  width={30}
                  height={30}
                  alt="Docker"
                  className="object-contain scale-125"
                />
              </div>
              <span>Docker</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg p-4 flex flex-col">
          <CardTitle className="text-lg sm:text-xl text-center text-primary font-semibold">
            Application Mobile
          </CardTitle>
          <CardContent className="pt-4 text-center text-primary font-normal text-base sm:text-lg">
            <div className="flex flex-row gap-2 items-center justify-center">
              <div className="w-[22px] h-[22px] sm:w-[25px] sm:h-[25px] flex items-center justify-center shrink-0">
                <Image
                  src="/icons8-react-native-50.png"
                  width={30}
                  height={30}
                  alt="React Native"
                  className="object-contain scale-125"
                />
              </div>
              <span>React Native</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}