"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Container } from "@chakra-ui/react";
import Header from "@/components/Header";
import Amount from "@/components/Amount";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <Container maxW="container.lg" my="2">
            <Amount />
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
