import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.jsx";
import "modern-normalize";
import { store } from "./store/store.js";
import "./i18n/index.js";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ReduxProvider>
  </StrictMode>,
);
