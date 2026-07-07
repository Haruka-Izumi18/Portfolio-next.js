"use client"
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

 export default function RealizationItem({
  title,
  image,
  discription,
  url,
  animationIndex,
}: {
  title: string;
  image: string | null;
  discription: string | null;
  url: string;
  animationIndex: number;
}) {return (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay: animationIndex * 0.15 }}
  >
    <Card size="sm" className="mx-auto w-full max-w-sm shadow-lg p-3">
      <CardHeader>
        <div className="relative w-full h-48 rounded-md overflow-hidden">
          <Image
            src={image ?? "/images/no-image.png"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover"
          />
        </div>
        <CardTitle className="pt-4 text-center text-primary font-semibold text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 text-center text-primary font-normal text-lg">
        {discription}
        </CardContent>
        <Button asChild variant="outline" size="sm" className="bg-button p-2 text-white hover:focus hover:text-primary border-button">
          <a href={url} target="_blank" rel="noopener noreferrer">
            Voir ce projet
          </a>
        </Button>
    </Card>
    </motion.div>
  );
}
