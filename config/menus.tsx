import { Brand } from "@/components/icons";
import { IconSvgProps } from "@/types";

export interface Menu {
  title: string;
  description: string;
  Icon: React.FC<IconSvgProps>;
  href: string;
}

export const menus: Menu[] = [
  {
    title: "Generador de historietas",
    description: "Crea tus propias historietas con la ayuda de la IA",
    Icon: Brand,
    href: "/comic-generator",
  },
];
