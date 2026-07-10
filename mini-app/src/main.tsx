import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import WebApp from "@twa-dev/sdk";
import { getTheme } from "./theme";
import App from "./App";

// Получаем цветовую схему Telegram (dark/light)
const colorScheme = WebApp.colorScheme || "dark";
const theme = getTheme(colorScheme);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Сброс стилей MUI */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
