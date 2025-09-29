"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUserFromToken, JwtPayload } from "@/lib/user";

interface AuthContextType {
  user: JwtPayload | null;
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  setToken: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<JwtPayload | null>(null);

  // Load token from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      setTokenState(stored);
      setUser(getUserFromToken(stored));
    }
  }, []);

  function setToken(newToken: string | null) {
    if (newToken) {
      localStorage.setItem("token", newToken);
      setUser(getUserFromToken(newToken));
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
    setTokenState(newToken);
  }

  return (
    <AuthContext.Provider value={{ user, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
