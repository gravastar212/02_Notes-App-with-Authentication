"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthContext();

  useEffect(() => {
    // Public routes that don't require authentication
    const publicRoutes = ["/login", "/signup"];
    
    // If user is not logged in and trying to access protected route
    if (!user && !publicRoutes.includes(pathname)) {
      router.push("/login");
    }
    
    // If user is logged in and trying to access login/signup pages
    if (user && publicRoutes.includes(pathname)) {
      router.push("/");
    }
  }, [user, pathname, router]);

  return <>{children}</>;
}
