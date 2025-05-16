import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface TotalsState {
  totalPortfolios: number | null;
  totalProjects: number | null;
  totalProducts: number | null;
  totalStorefronts: number | null;
  totalPaymentLinks: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: TotalsState = {
  totalPortfolios: null,
  totalProjects: null,
  totalProducts: null,
  totalStorefronts: null,
  totalPaymentLinks: null,
  loading: false,
  error: null,
};

export const fetchTotals = createAsyncThunk("totals/fetchTotals", async () => {
  const response = await fetch("/api/dashboard/totals");

  if (!response.ok) {
    throw new Error(
      `Failed to fetch totals: ${response.status} - ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
});

const totalsSlice = createSlice({
  name: "totals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotals.fulfilled, (state, action) => {
        state.totalPortfolios = action.payload.totalPortfolios;
        state.totalProjects = action.payload.totalProjects;
        state.totalProducts = action.payload.totalProducts;
        state.totalStorefronts = action.payload.totalStorefronts;
        state.totalPaymentLinks = action.payload.totalPaymentLinks;
        state.loading = false;
      })
      .addCase(fetchTotals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch totals";
      });
  },
});

export default totalsSlice.reducer;
