import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import AuthProvider from "./context/AuthProvider.jsx";
import LanguageProvider from "./context/LanguageProvider.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";
import App from "./App.jsx";
import "modern-normalize";
import { store } from "./app/store.js";
import "./i18n/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <AuthProvider>
        <LanguageProvider>
          <ThemeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </ReduxProvider>
  </StrictMode>
);
