"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import CustomQueryProvider from "./CustomQueryProvider";

export function Providers({ children }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <CustomQueryProvider>{children}</CustomQueryProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
