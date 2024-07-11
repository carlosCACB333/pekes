"use server";

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

// generar las conversaciones a partir del texto

export const getConversation = async (prevState: any, form: FormData) => {
  // obtener el texto del formulario
  const message = form.get("message") as string;

  if (!message) {
    return [];
  }

  const { text } = await generateText({
    model: openai("gpt-4-turbo"),
    system:
      "Eres un conversor de texto a historietas habladas. responde con un json con las conversaciones, tambien incluye un texto en cada conversación que explique de manera corta la situación. El json debe tener siempre la siguiente estructura: [{situacion: '',dialogos: [{personaje: '',texto: '',},],},]. no agregues al narrador como personaje.",
    prompt: message,
  });

  const conversation = JSON.parse(
    text.replace("```json\n", "").replace("```", "")
  );

  return conversation as Conversation[];
};

export interface Conversation {
  situacion: string;
  dialogos: Array<{
    personaje: string;
    texto: string;
  }>;
}
