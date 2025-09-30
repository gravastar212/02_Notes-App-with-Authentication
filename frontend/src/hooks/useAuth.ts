"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const updateToken = () => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    };

    // Initial load
    updateToken();

    // Listen for storage changes
    window.addEventListener("storage", updateToken);

    // Custom event for same-tab updates
    const handleAuthChange = () => updateToken();
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("storage", updateToken);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  return token;
}