import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import preferencesReducer from "./preferencesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    preferences: preferencesReducer,
  },
});
