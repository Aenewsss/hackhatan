import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Toolbar from "@/components/Toolbar";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "Hackathan",
  description: "Arquivo Nacional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="pt-BR">
        <body className={poppins.className}>
          {children}
          <Toolbar />
        </body>
      </html>
  );
}
