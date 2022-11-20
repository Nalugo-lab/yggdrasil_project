export const Theme = {
  dark: {
    name: "dark",
    colors: {
      primary: "#d5043c",
      secondary: "hsl(333deg, 100%, 52%)",
      tertiary: "rgb(15, 73, 197)",
      text: {
        primary: "#fff",
        secondary: "#fff",
      },
      background: {
        primary: "#141414",
        secondary: "#0E141B",
      },
      info: "hsl(2s30deg, 100%, 69%)",
      success: "hsl(160deg, 100%, 40%)",
      error: "hsl(340deg, 95%, 60%)",
      alert: "hsl(30deg, 100%, 50%)",
    },
  },
  light: {
    name: "light",
    colors: {
      primary: "#627038",
      secondary: "#233721",
      tertiary: "rgb(15, 73, 197)",
      text: {
        primary: "#000",
        secondary: "#fff",
      },
      background: {
        primary: "#F6F8E4",
        secondary: "#DDDFCD",
      },
      info: "hsl(230deg, 100%, 69%)",
      success: "hsl(160deg, 100%, 40%)",
      error: "hsl(340deg, 95%, 60%)",
      alert: "hsl(30deg, 100%, 50%)",
    },
  },
};

import { css } from "styled-components";

export const darkTheme = css`
  --primary: ${({ theme }) => theme.dark.colors.primary};
  --secondary: ${({ theme }) => theme.dark.colors.secondary};
  --tertiary: ${({ theme }) => theme.dark.colors.tertiary};
  --text: ${({ theme }) => theme.dark.colors.text.primary};
  --text-secondary: ${({ theme }) => theme.dark.colors.text.secondary};
  --background-primary: ${({ theme }) => theme.dark.colors.background.primary};
  --background-secondary: ${({ theme }) =>
    theme.dark.colors.background.secondary};
  --info: ${({ theme }) => theme.dark.colors.info};
  --success: ${({ theme }) => theme.dark.colors.success};
  --error: ${({ theme }) => theme.dark.colors.error};
  --alert: ${({ theme }) => theme.dark.colors.alert};
  --inverse: brightness(0) invert(1);
  --inverse-inverse: brightness(0) invert(1);
`;

export const lightTheme = css`
  --primary: ${({ theme }) => theme.light.colors.primary};
  --secondary: ${({ theme }) => theme.light.colors.secondary};
  --tertiary: ${({ theme }) => theme.light.colors.tertiary};
  --text: ${({ theme }) => theme.light.colors.text.primary};
  --text-secondary: ${({ theme }) => theme.light.colors.text.secondary};
  --background-primary: ${({ theme }) => theme.light.colors.background.primary};
  --background-secondary: ${({ theme }) =>
    theme.light.colors.background.secondary};
  --info: ${({ theme }) => theme.light.colors.info};
  --success: ${({ theme }) => theme.light.colors.success};
  --error: ${({ theme }) => theme.light.colors.error};
  --alert: ${({ theme }) => theme.light.colors.alert};
  --inverse: brightness(0) invert(0);
  --inverse-inverse: brightness(0) invert(1);
`;
