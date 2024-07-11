"use client";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Toaster } from "sonner";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <ChildProvider>{children}</ChildProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

interface ChildProps {
  children: React.ReactNode;
}

const ChildProvider = ({ children }: ChildProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <>
      {children} <Toaster theme={isDark ? "dark" : "light"}  richColors/>
    </>
  );
};
