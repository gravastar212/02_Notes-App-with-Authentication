"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import RouteGuard from "@/components/RouteGuard";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ChakraProvider value={defaultSystem}>
          <AuthProvider>
            <RouteGuard>
              <Navbar />
              {children}
              <Toaster />
            </RouteGuard>
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}