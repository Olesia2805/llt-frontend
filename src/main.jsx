import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import LanguageProvider from "./context/LanguageProvide.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";
import App from "./App.jsx";
import "modern-normalize";
import { store } from "./app/store.js";
import "./i18n/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </LanguageProvider>
  </StrictMode>
);
