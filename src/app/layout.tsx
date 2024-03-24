import "~/styles/globals.css";

import { type ReactElement } from "react";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { ReactFireProvider, ThemeProvider } from "~/providers";
import ReduxProvider from "~/providers/ReduxProvider";
import TailwindIndicator from "~/shared/custom/tailwind-indicator";

import { cn } from "~/lib/utils";

export const metadata = {
  title: "EonShift",
  description: "Shifting energy for a better tomorrow.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: ReactElement }) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning={true}
    >
      <body className={`bg-background font-sans`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme={"dark"}
          disableTransitionOnChange
        >
          <ReactFireProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </ReactFireProvider>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
