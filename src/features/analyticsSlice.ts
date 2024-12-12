import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAnalyticsData } from "../api/mockApi";

export const fetchAnalytics = createAsyncThunk("analytics/fetch", async () => {
  const data = await fetchAnalyticsData();
  return data;
});

interface AnalyticsState {
  totalUsers: number;
  activeUsers: number;
  deletedUsers: number;
  userRegistrations: any[];
  regionData: any[];
}

const initialState: AnalyticsState = {
  totalUsers: 0,
  activeUsers: 0,
  deletedUsers: 0,
  userRegistrations: [],
  regionData: [],
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAnalytics.fulfilled, (state, action) => {
      state.totalUsers = action.payload.totalUsers;
      state.activeUsers = action.payload.activeUsers;
      state.deletedUsers = action.payload.deletedUsers;
      state.userRegistrations = action.payload.userRegistrations;
      state.regionData = action.payload.regionData;
    });
  },
});

export default analyticsSlice.reducer;
