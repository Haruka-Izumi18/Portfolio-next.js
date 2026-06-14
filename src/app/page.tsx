import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-5xl flex-col py-32 px-16 dark:bg-black">
        <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-4 text-left">
            <h1 className="text-4xl font-semibold dark:text-zinc-50">
              Développeuse Web < br />Full Stack
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
      </main>
    </div>
  );
}
