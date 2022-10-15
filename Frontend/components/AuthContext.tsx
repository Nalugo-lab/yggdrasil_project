import { createContext, useEffect, useState } from "react";
import Router from "next/router";
import { setCookie } from "cookies-next";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  user: any;
  CsrfToken: string | null;
  RefreshToken: string | null;
  AccessToken: string | null;
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
  const [RefreshToken, setRefreshToken] = useState<string | null>(null);
  const [AccessToken, setAccessToken] = useState<string | null>(null);
  const isAuthenticated = !!user;

  async function fetchUser() {
    const headers = new Headers({
      "Content-Type": "application/json",
      "X-CSRFToken": CsrfToken ? CsrfToken : '',
    });

    const response = await fetch("http://localhost:8000/auth/authenticate", {
      method: "POST",
      headers,
      body: JSON.stringify({ token: AccessToken }),
    });

    console.log
    if (!response.ok) {
      return null;
    } else {
      const user = await response.json();
      return "EU TENHO A FORÇA";
    }
  }

  useEffect(() => {
    fetchUser();
  }, [CsrfToken]);

  useEffect(() => {
    setCookie("RefreshToken", RefreshToken);
  }, [RefreshToken]);

  useEffect(() => {
    setCookie("AccessToken", AccessToken);
  }, [AccessToken]);

  useEffect(() => {
    setCsrfToken(getCookie("csrftoken"));
  }, []);

  async function login({ username, password }: LoginDataType) {
    // TEM QUE VER DE DAR CATCH AQUI

    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    const { refresh, access } = data;

    if (refresh) {
      console.log('refresh', refresh)
      setRefreshToken(refresh);
      setAccessToken(access);
      const user = await fetchUser();
      console.log(user);

      setUser(user);
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
      value={{
        isAuthenticated,
        login,
        logout,
        user,
        CsrfToken,
        RefreshToken,
        AccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
