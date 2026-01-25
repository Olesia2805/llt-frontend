import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCityInfo as apiGetCityInfo } from "../api/integration.api";

export const getCityInfo = createAsyncThunk(
  "integration/getCityInfo",
  async (city, thunkAPI) => {
    try {
      return await apiGetCityInfo(city);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const integrationSlice = createSlice({
  name: "integrationData",
  initialState: { cityInfo: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCityInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCityInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.cityInfo = action.payload;
      })
      .addCase(getCityInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default integrationSlice.reducer;
