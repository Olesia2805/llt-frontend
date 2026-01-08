import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: { auth: (state = { user: null }) => state },
});
