import { createContext, useEffect, useState } from "react";
import Router from "next/router";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  user: any;
  CsrfToken: string | null;
};

type LoginDataType = {
  username: string;
  password: string;
};

function getCookie(name: any): string | null {
  if (!document.cookie) {
    return null;
  }

  const xsrfCookies = document.cookie
    .split(";")
    .map((c) => c.trim())
    .filter((c) => c.startsWith(name + "="));

  if (xsrfCookies.length === 0) {
    return null;
  }
  return decodeURIComponent(xsrfCookies[0].split("=")[1]);
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState(null);
  const [CsrfToken, setCsrfToken] = useState<string | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    async function fetchUser() {
      if (CsrfToken) {
        const headers = new Headers({
          "Content-Type": "application/json",
          "X-CSRFToken": CsrfToken,
        });

        const response = await fetch(
          "http://localhost:3000/django/auth/authenticate",
          {
            method: "POST",
            headers,
          }
        );
        const { user } = await response.json();
        setUser(user);
      }
    }
    fetchUser();
  }, [CsrfToken]);

  useEffect(() => {
    setCsrfToken(getCookie("csrftoken"));
  }, []);

  async function login({ username, password }: LoginDataType) {
    // TEM QUE VER DE DAR CATCH AQUI

    const response = await fetch("http://localhost:3000/django/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    const { user } = data;

    if (user) {
      setUser(user);
      setCsrfToken(getCookie("csrftoken"));
      Router.push("/");
    } else {
      console.log("deu merda");
    }
  }

  async function logout() {
    // TEM QUE VER DE DAR CATCH AQUI

    if (CsrfToken) {
      const headers = new Headers({
        "Content-Type": "application/json",
        "X-CSRFToken": CsrfToken,
      });

      await fetch("http://localhost:3000/django/auth/logout", {
        method: "POST",
        headers,
      });

      setUser(null);
      setCsrfToken(getCookie("csrftoken"));
      Router.push("/login");
    } else {
      Router.push("/");
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, CsrfToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
