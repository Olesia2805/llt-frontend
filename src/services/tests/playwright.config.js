import { defineConfig } from "@playwright/test";
import process from "node:process";

const backendBaseUrl = process.env.VITE_PROXY_TARGET;
const targetUrl = `${backendBaseUrl}/api/v1/`;

export default defineConfig({
  use: {
    baseURL: targetUrl,
    extraHTTPHeaders: {
      "Content-Type": "application/json",
    },
  },
});
