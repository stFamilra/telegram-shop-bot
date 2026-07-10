import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";

// Функция для получения темы в зависимости от цветовой схемы Telegram
export const getTheme = (colorScheme: "light" | "dark"): Theme => {
  return createTheme({
    palette: {
      mode: colorScheme,
      primary: {
        main: "#2aabee", // Базовый цвет Telegram
      },
      background: {
        default: colorScheme === "dark" ? "#0a0a0a" : "#ffffff",
        paper: colorScheme === "dark" ? "#1e1e1e" : "#f5f5f5",
      },
      text: {
        primary: colorScheme === "dark" ? "#ffffff" : "#000000",
        secondary: colorScheme === "dark" ? "#aaaaaa" : "#666666",
      },
    },
  });
};
