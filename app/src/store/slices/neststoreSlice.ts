// store/slices/storefrontSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '@/app/api/api';
import { NextApiRequest, NextApiResponse } from 'next';

// Async thunk for fetching storefront data
export const fetchStorefront = createAsyncThunk(
  'storefront/fetchStorefront',
  async (name: string, { rejectWithValue }) => {
    const response = await apiRequest({} as NextApiRequest, {} as NextApiResponse, `/api/v1/storefront/${name}`, 'GET');

    if (response.status !== 200) {
      return rejectWithValue(response.message || 'Failed to fetch storefront');
    }

    return response.data;
  }
);

// Define the initial state
interface StorefrontState {
  storefront: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: StorefrontState = {
  storefront: null,
  loading: false,
  error: null,
};

// Create the storefront slice
const neststoreSlice = createSlice({
  name: 'storefront',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStorefront.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStorefront.fulfilled, (state, action) => {
        state.storefront = action.payload;
        state.loading = false;
      })
      .addCase(fetchStorefront.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default neststoreSlice.reducer;
