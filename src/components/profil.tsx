import Image from "next/image";

export default function Profil() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
      <Image
        src="/HARUKAphoto©FrédéricPOLETTI-0406.png"
        width={450}
        height={350}
        className="object-contain rounded-lg"
        alt="Photo profile"
      />
      <h2 className="font-normal text-start dark:text-zinc-50">
        Développeur Full Stack. Je développe des applications web et mobiles.
        Actuellement en stage, je participe au développement de solutions web
        performantes et maintenables. Je recherche un poste de Développeur Full
        Stack afin de contribuer à des projets innovants tout en continuant à
        développer mes compétences techniques.
      </h2>
    </div>
  );
}
