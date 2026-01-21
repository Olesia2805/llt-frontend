import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPreferences as getPreferencesApi,
  updatePreferences as updatePreferencesApi,
} from "../api/user.api";

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
  "preferences/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getPreferencesApi();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const updatePreferences = createAsyncThunk(
  "preferences/update",
  async (payload, { rejectWithValue }) => {
    try {
      return await updatePreferencesApi(payload);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const preferencesSlice = createSlice({
  name: "preferences",
  initialState: {
    data: loadGuestPreferences(),
    loading: false,
    error: null,
  },

  reducers: {
    setTheme(state, action) {
      state.data.theme = action.payload;
    },

    setLanguage(state, action) {
      state.data.language = action.payload;
    },

    clearPreferences(state) {
      state.data = getInitialPreferences();
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPreferences.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.data = {
          ...state.data,
          ...action.payload,
        };
      })
      .addCase(getPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatePreferences.fulfilled, (state, action) => {
        state.data = {
          ...state.data,
          ...action.payload,
        };
      });
  },
});

export const {
  setTheme,
  toggleTheme,
  setLanguage,
  setNotifications,
  clearPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
