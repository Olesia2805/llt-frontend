import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import integrationReducer from "./integrationSlice.js";

export const store = configureStore({
  reducer: {
    userData: userReducer,
    integrationData: integrationReducer,
  },
});
