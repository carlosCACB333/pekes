"use server";

import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const schema = z.object({
  scenes: z.array(
    z.object({
      context: z
        .string()
        .describe(
          "El contexto explica la situación (tambien puede ser el narrador)"
        ),
      dialogues: z.array(
        z.object({
          character: z.string().describe("El personaje que habla"),
          text: z.string().describe("El texto que dice el personaje"),
        })
      ),
    })
  ),
});

export const getConversation = async (prevState: any, form: FormData) => {
  const message = form.get("message") as string;

  if (!message) {
    return [];
  }

  const { object } = await generateObject({
    model: openai("gpt-4-turbo"),
    schema: schema,
    system:
      "Convierte un texto en una conversación de varias escenas. Usa un tono infantil.",
    prompt: message,
    maxTokens: 1000,
  });

  return object.scenes;
};
