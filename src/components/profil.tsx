import Image from "next/image";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";


export default function Profil() {
  return (
    <>
      <div className="flex flex-col flex-1 lg:flex-row gap-8 justify-center">
        <Image
          src="/HARUKAphotoFrédéricPOLETTI-0406.jpeg"
          width={450}
          height={350}
          className="object-contain rounded-lg shadow-lg"
          alt="Photo profile"
        />
        <div className="flex flex-col gap-8 items-start justify-center">
          <h2 className="text-4xl font-bold tracking-tight dark:text-zinc-50">Haruka IZUMI</h2>
        <p className="font-normal text-start dark:text-zinc-50 pl-2">
          Développeur Full Stack. Je développe des applications web et mobiles.
          Actuellement en stage, je participe au développement de solutions web
          performantes et maintenables. Je recherche un poste de Développeur
          Full Stack afin de contribuer à des projets innovants tout en
          continuant à développer mes compétences techniques.
        </p>
        <div className="flex flex-row gap-6">
        <Link href="https://www.linkedin.com/in/haruka-izumi-b1a184397/" className="hover:underline">
          <div className="flex flex-row gap-2 items-center">
            <div className="w-[30px] h-[30px] flex items-center justify-center shrink-0">
              <Image
                src="/icons8-linkedin-48.png"
                width={30}
                height={30}
                alt="LinkedIn"
                className="object-contain scale-125"
              />
            </div>
            <span className="text-xl font-semibold">LinkedIn</span>
            </div>
          </Link>
          <Link href="https://www.linkedin.com/in/haruka-izumi-b1a184397/" className="hover:underline">
          <div className="flex flex-row gap-2 items-center">
            <div className="w-[30px] h-[30px] flex items-center justify-center shrink-0">
              <Image
                src="/icons8-github-64.png"
                width={30}
                height={30}
                alt="GitHub"
                className="object-contain scale-125"
              />
            </div>
            <span className="text-xl font-semibold">GitHub</span>
            </div>
          </Link>
          </div>
          </div>
      </div>

      <div className="flex flex-row pt-3 gap-3 items-stretch w-full">
        <Card className="flex-1 shadow-lg p-4 flex flex-col">
          <CardTitle className="text-xl text-center text-primary font-semibold ">
            Langues
          </CardTitle>
          <CardContent className="pt-4 text-center text-primary font-normal text-lg">
            🇫🇷 Francais Indépendant
            <br />
            🇯🇵 Japonais Maternelle
            <br />
            🇬🇧 Anglais Intermédiaire
          </CardContent>
        </Card>

        <Card className="flex-1 shadow-lg p-4 flex flex-col">
          <CardTitle className="text-xl text-center text-primary font-semibold">
            Front end
          </CardTitle>
          <CardContent className="pt-4 text-center text-primary font-normal text-lg">
            <div className="flex flex-row gap-2 items-center">
              <div className="w-[25px] h-[25px] flex items-center justify-center shrink-0">
                <Image
                  src="/icons8-html-48.png"
                  width={30}
                  height={30}
                  alt="HTML"
                  className="object-contain scale-125"
                  />
              </div>
              <span>HTML</span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="w-[25px] h-[25px] flex items-center justify-center shrink-0">
                <Image
                  src="/icons8-css-48.png"
                  width={30}
                  height={30}
                  alt="CSS"
                  className="object-contain scale-125"
                />
              </div>
              <span>CSS</span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="w-[25px] h-[25px] flex items-center justify-center shrink-0">
                <Image
                  src="/icons8-javascript-48.png"
                  width={30}
                  height={30}
                  alt="JavaScript"
                  className="object-contain scale-125"
                />
              </div>
              <span>Java Script</span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="w-[25px] h-[25px] flex items-center justify-center shrink-0">
                <Image
                  src="/icons8-tailwind-css-48.png"
                  width={30}
                  height={30}
                  alt="Tailwind CSS"
                  className="object-contain scale-125"
                />
              </div>
              <span>Tailwind CSS</span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="w-[25px] h-[25px] flex items-center justify-center shrink-0">
                <Image
                  src="/icons8-typescript-48.png"
                  width={30}
                  height={30}
                  alt="TypeScript"
                  className="object-contain scale-125"
                />
              </div>
              <span>TypeScript</span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="w-[25px] h-[25px] flex items-center justify-center shrink-0">
                <Image
                  src="/icons8-next.js-48.png"
                  width={30}
                  height={30}
                  alt="Nextjs"
                  className="object-contain scale-125"
                />
              </div>
              <span>Next.js</span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="w-[25px] h-[25px] flex items-center justify-center shrink-0">
                <Image
                  src="/icons8-svelte-48.png"
                  width={30}
                  height={30}
                  alt="Svelte"
                  className="object-contain scale-125"
                />
              </div>
              <span>Svelte</span>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 shadow-lg p-4 flex flex-col">
          <CardTitle className="text-xl text-center text-primary font-semibold ">
            Back end
          </CardTitle>
          <CardContent className="pt-4 text-center text-primary font-normal text-lg">
            <div className="flex flex-row gap-2 items-center">
              <div className="w-[25px] h-[25px] flex items-center justify-center shrink-0">
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
            <div className="flex flex-row gap-2 items-center">
              <div className="w-[25px] h-[25px] flex items-center justify-center shrink-0">
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

        <Card className="flex-1 shadow-lg p-4 flex flex-col">
          <CardTitle className="text-xl text-center text-primary font-semibold ">
            Outis & environnement
          </CardTitle>
          <CardContent className="pt-4 text-center text-primary font-normal text-lg">
            <div className="flex flex-row gap-2 items-center">
              <div className="w-[25px] h-[25px] flex items-center justify-center shrink-0">
                <Image
                  src="/icons8-github-64.png"
                  width={30}
                  height={30}
                  alt="Git/GitHub"
                  className="object-contain scale-125"
                  />
                  </div>
                  <span>GitGitHub</span>
                  </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="w-[25px] h-[25px] flex items-center justify-center shrink-0">
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

        <Card className="flex-1 shadow-lg p-4 flex flex-col">
          <CardTitle className="text-xl text-center text-primary font-semibold ">
            Application Mobile
          </CardTitle>
          <CardContent className="pt-4 text-center text-primary font-normal text-lg">
            <div className="flex flex-row gap-2 items-center">
              <div className="w-[25px] h-[25px] flex items-center justify-center shrink-0">
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
    </>
  );
}
