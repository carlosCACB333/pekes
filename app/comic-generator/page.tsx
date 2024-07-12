"use client";

import { getConversation } from "@/actions/ia";
import { text } from "@/components/primitives";
import { InitialText } from "@/config/text";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Textarea } from "@nextui-org/input";
import { useFormState, useFormStatus } from "react-dom";

export default function ComicGenerator() {
  const [state, formAction] = useFormState(getConversation, []);
  return (
    <section className="flex flex-col gap-8">
      <form action={formAction} className="">
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
        <SubmitButton />
      </form>

      <div className="flex flex-col gap-2">
        {state.map((conversation, index) => (
          <Card key={index}>
            <CardBody>
              <h2 className={text({ size: "base", font: "bold" })}>
                {conversation.context}
              </h2>
              <div className="flex flex-col gap-2">
                {conversation.dialogues.map((dialogo, index) => (
                  <div key={index} className="flex gap-1 items-center">
                    <span className={text({ size: "sm", font: "bold" })}>
                      {dialogo.character}:
                    </span>
                    <span className={text({ size: "xs" })}>{dialogo.text}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}

const SubmitButton = () => {
  const status = useFormStatus();
  return (
    <Button size="lg" color="primary" isLoading={status.pending} type="submit">
      Generar historieta
    </Button>
  );
};

export const maxDuration = 60;
