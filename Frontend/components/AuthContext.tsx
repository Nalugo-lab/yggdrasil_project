import { createContext, useEffect, useState } from "react";
import Router from "next/router";
import jwt_decode from "jwt-decode";
import { deleteCookie, setCookie } from "cookies-next";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  authFetch: (
    url: string,
    method: string,
    body: string | FormData
  ) => Promise<any>;
  user: any;
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
  const [RefreshToken, setRefreshToken] = useState<string | null>(null);
  const [AccessToken, setAccessToken] = useState<string | null>(null);
  const isAuthenticated = !!user;

  async function fetchUser() {
    if (AccessToken == null || AccessToken == "null") {
      setUser(null);
      return;
    }

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const response = await fetch("http://localhost:8000/auth/authenticate", {
      method: "POST",
      headers,
      body: JSON.stringify({ token: AccessToken }),
    });

    if (response.ok) setUser(jwt_decode<any>(AccessToken).user_id);
    else setUser(null);
  }


  useEffect(() => {
    if (!RefreshToken) return;
    localStorage.setItem("RefreshToken", RefreshToken);
    setCookie("RefreshToken", RefreshToken);
  }, [RefreshToken]);

  useEffect(() => {
    if (!AccessToken) return;
    localStorage.setItem("AccessToken", AccessToken);
    setCookie("AccessToken", AccessToken);
    fetchUser();
  }, [AccessToken]);

  useEffect(() => {
    setAccessToken(localStorage.getItem("AccessToken"));
    setRefreshToken(localStorage.getItem("RefreshToken"));
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

    if (response.ok) {
      setRefreshToken(refresh);
      setAccessToken(access);
      Router.push("/");
    } else {
      console.log("deu merda");
    }
  }

  async function logout() {
    // TEM QUE VER DE DAR CATCH AQUI

    setUser(null);
    setRefreshToken(null);
    setAccessToken(null);
    deleteCookie("RefreshToken");
    deleteCookie("AccessToken");

    Router.push("/login");
  }

  async function authFetch(
    url: string,
    method: string,
    body: string | FormData
  ) {
    if (!isAuthenticated) return;

    const headers = new Headers({
      // "X-CSRFToken": CsrfToken,
      Authorization: "Bearer " + String(AccessToken),
      // "Accept": "application/json",
      // "Content-Type": "application/json"
    });

    return fetch(url, {
      method,
      headers,
      body,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        authFetch,
        user,
        RefreshToken,
        AccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
