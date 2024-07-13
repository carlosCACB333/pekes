"use server";

import { openai } from "@ai-sdk/openai";
import * as fal from "@fal-ai/serverless-client";
import { generateObject } from "ai";
import { z } from "zod";

fal.config({ credentials: process.env.FAL_KEY });

const scene = z.object({
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
});

const schema = z.object({
  scenes: z.array(scene),
});

export interface Scene extends z.infer<typeof scene> {
  image?: string;
}

export const getConversation = async (prompt: string) => {
  try {
    if (!prompt) {
      return [];
    }

    const { object } = await generateObject({
      model: openai("gpt-4-turbo"),
      schema: schema,
      system:
        "Convierte un texto en una conversación de varias escenas. Usa un tono infantil.",
      prompt: prompt,
      maxTokens: 1000,
    });

    return object.scenes as Scene[];
  } catch (error) {
    return [];
  }
};

export const getImageFromText = async (prompt: string) => {
  try {
    const result: any = await fal.subscribe("fal-ai/lora", {
      input: {
        model_name: "stabilityai/stable-diffusion-xl-base-1.0",
        prompt: prompt,
      },
      logs: true,
    });
    return result.images[0].url as string;
  } catch (error) {
    return "/images/blanck.png";
  }
};
