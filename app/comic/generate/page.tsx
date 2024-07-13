import { getConversation, getImageFromText, Scene } from "@/actions/ia";
import { text } from "@/components/primitives";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { Skeleton } from "@nextui-org/skeleton";
import { Spinner } from "@nextui-org/spinner";
import { Suspense } from "react";
interface Props {
  searchParams: {
    message: string;
  };
}

export const maxDuration = 60;

export default function ComicGenerator({ searchParams }: Props) {
  const { message } = searchParams;
  console.log(message);
  return (
    <section className="flex flex-col gap-8">
      <Link href="/comic" >
        Volver
      </Link>
      <Suspense fallback={<Spinner label="Generando..." />}>
        <ComicText prompt={message} />
      </Suspense>
    </section>
  );
}

const ComicText = async ({ prompt }: { prompt: string }) => {
  const scenes = await getConversation(prompt);
  return (
    <div className="grid grid-cols-12 gap-4">
      {scenes.map((scene, index) => (
        <ComicCard key={index} scene={scene} />
      ))}
    </div>
  );
};

const ComicCard = ({ scene }: { scene: Scene }) => {
  let prompt = `Para la siguiente escena: ${scene.context} genera un diálogo con los siguientes personajes:\n`;
  let characters = new Set(scene.dialogues.map((d) => d.character));
  prompt += Array.from(characters).join("\n");

  return (
    <Card className="w-full relative col-span-12 md:col-span-6">
      <CardBody>
        <Suspense
          fallback={
            <Skeleton className="rounded-lg">
              <div className="aspect-video h-[300px] w-full" />
            </Skeleton>
          }
        >
          <ComicImage prompt={prompt} />
        </Suspense>
      </CardBody>
      <CardFooter className="flex flex-col items-start">
        <p className={text({ size: "md", font: "bold" })}>{scene.context}</p>
        <div className="flex flex-grow gap-2 items-center">
          <div className="flex flex-col gap-2">
            {scene.dialogues.map((dialogue, index) => (
              <div key={index} className="flex gap-2 items-center">
                <p className={text({ size: "xs", font: "bold" })}>
                  {dialogue.character}:
                </p>
                <p className={text({ size: "xs", color: "disabled" })}>
                  {dialogue.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

const ComicImage = async ({ prompt }: { prompt: string }) => {
  const image = await getImageFromText(prompt);
  return (
    <Image
      removeWrapper
      alt={prompt}
      className="z-0 object-cover aspect-video h-[300px] w-full"
      src={image}
    />
  );
};
