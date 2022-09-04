import type { AppProps } from "next/app";
import { Theme } from "../styles/theme";
import { ThemeProvider } from "styled-components";
import Template from "../components/layouts/template";
import GlobalStyle from "../styles/GlobalStyle";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    __theme: any;
    __setPreferredTheme: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, toggleTheme] = useState<any>();

  useEffect(() => {
    toggleTheme(window.__theme);
    window.__setPreferredTheme(window.__theme);
    const body = document.querySelector("body");
    if (body) body.style.transition = "var(--transitionActive)";
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Template
          toggleDarkMode={() => {
            window.__setPreferredTheme(theme == "dark" ? "light" : "dark");
            toggleTheme(theme == "dark" ? "light" : "dark");
            return true;
          }}
        >
          <Component {...pageProps} />
        </Template>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
