import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as apiAuth from "../api/auth.api";
import * as apiUser from "../api/user.api";

const GUEST_PREFS_KEY = "guestPreferences";

const getInitialPreferences = () => ({
  theme: "dark",
  language: "uk",
});

const loadGuestPreferences = () => {
  try {
    const saved = localStorage.getItem(GUEST_PREFS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to load guest preferences:", error);
  }
  return getInitialPreferences();
};

export const getPreferences = createAsyncThunk(
  "preferences/get",
  async (_, { rejectWithValue }) => {
    try {
      return await apiUser.getPreferences();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const updatePreferences = createAsyncThunk(
  "preferences/update",
  async (payload, { rejectWithValue }) => {
    try {
      return await apiUser.updatePreferences(payload);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

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
      return { ...userData, preferences };
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
      const preferences = await apiUser.getPreferences();
      return { user, preferences };
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
  preferences: loadGuestPreferences(),
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    clearAuth(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setTheme(state, action) {
      state.preferences.theme = action.payload;
    },
    setLanguage(state, action) {
      state.preferences.language = action.payload;
    },
    clearPreferences(state) {
      state.preferences = getInitialPreferences();
      state.error = null;
      state.loading = false;
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
        state.preferences = action.payload.preferences;
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
        state.user = action.payload.user;
        state.preferences = action.payload.preferences;
        state.isAuthenticated = true;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.preferences = getInitialPreferences();
      })

      .addCase(getPreferences.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = { ...state.preferences, ...action.payload };
      })
      .addCase(getPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePreferences.fulfilled, (state, action) => {
        state.preferences = { ...state.preferences, ...action.payload };
      });
  },
});

export const { clearAuth, setTheme, setLanguage, clearPreferences } =
  userSlice.actions;

export default userSlice.reducer;
