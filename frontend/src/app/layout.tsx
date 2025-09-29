"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider value={defaultSystem}>
          {children}
          <Toaster />
        </ChakraProvider>
      </body>
    </html>
  );
}