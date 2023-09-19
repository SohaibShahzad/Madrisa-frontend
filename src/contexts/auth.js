"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { parseCookies } from "nookies";
import * as jwt from "jsonwebtoken";

const jwtDecode = jwt.decode;

const AuthContext = createContext();

export const withAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken) {
          setAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      if (pathname.startsWith("/dashboard")) {
        router.replace("/");
      }
    }
  }, []);

  const value = {
    authenticated,
    setAuthenticated,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
