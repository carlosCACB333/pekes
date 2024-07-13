"use client";
import { text } from "@/components/primitives";
import { InitialText } from "@/config/text";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { useRouter } from "next/navigation";

export default function ComicGenerator(props: any) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    router.push(`/comic/generate?message=${formData.get("message")}`);
  };

  return (
    <section className="flex flex-col gap-8">
      <form onSubmit={handleSubmit}>
        <h1 className={text({ size: "md" })}>Generador de historietas</h1>
        <Textarea
          name="message"
          label="Escribe un texto para generar una historieta"
          placeholder={InitialText}
          maxRows={16}
          variant="bordered"
          defaultValue={InitialText}
        />
        <br />

        <Button type="submit" color="primary">
          Generar historieta
        </Button>
      </form>
    </section>
  );
}

export const maxDuration = 60;
