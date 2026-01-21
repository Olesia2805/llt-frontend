import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as apiAuth from "../api/auth.api";
import * as apiUser from "../api/user.api";

export const refreshTokens = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token");

      await apiAuth.refreshTokens();
      const user = await apiUser.getCurrentUser();

      return user;
    } catch (err) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return rejectWithValue(err.message);
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await apiAuth.login({ email, password });
      const [userData, preferences] = await Promise.all([
        apiUser.getCurrentUser(),
        apiUser.getPreferences(),
      ]);
      return { ...userData, ...preferences };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async ({ credential }, { rejectWithValue }) => {
    try {
      const user = await apiAuth.googleAuth(credential);
      return user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await apiAuth.logout();
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
});

const initialState = {
  user: null,
  isAuthenticated: false,
  isRefreshing: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshTokens.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshTokens.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(refreshTokens.rejected, (state) => {
        state.isRefreshing = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
