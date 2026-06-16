import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";


 export default function RealizationItem({
  title,
  image,
  discription,
  url,
}: {
  title: string;
  image: string;
  discription: string;
  url: string;
}) {return (
    <Card size="sm" className="mx-auto w-full max-w-sm shadow-lg p-3">
      <CardHeader>
        <div className="relative w-full h-48 rounded-md overflow-hidden">
          <Image
            src={`/${image}`}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover"
          />
        </div>
        <CardTitle className="pt-4 text-center text-primary font-semibold text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 text-center text-primary font-medium text-lg">
        {discription}
        </CardContent>
        <Button asChild variant="outline" size="sm" className="w-full bg-button p-2 text-white hover:focus hover:text-primary border-button">
          <a href={url} target="_blank" rel="noopener noreferrer">
            Voir le projet
          </a>
        </Button>
    </Card>
  );
}
