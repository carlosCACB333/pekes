import { Metadata } from "next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  title: "Generador de historietas",
  description:
    "Generador de historietas a partir de texto con inteligencia artificial",
  keywords: ["comic", "historieta", "ia", "inteligencia artificial"],
};
