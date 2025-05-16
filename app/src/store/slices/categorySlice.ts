import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '@/app/api/api';
import { NextApiRequest, NextApiResponse } from 'next';

interface Category {
  id: string;
  name: string;
  storefrontId: string;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Fetch categories by storefront
export const fetchCategories = createAsyncThunk<Category[], string, { rejectValue: { message: string } }>(
  'category/fetchCategories',
  async (storefrontId, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, `/api/v1/${storefrontId}/categories`, 'GET');

    if (response.status === 200) {
      return response.data.categories;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to fetch categories',
      });
    }
  }
);

// Create a category
export const createCategory = createAsyncThunk<Category, { storefrontId: string; name: string }, { rejectValue: { message: string } }>(
  'category/createCategory',
  async ({ storefrontId, name }, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, `/api/v1/${storefrontId}/categories`, 'POST', { name });

    if (response.status === 201) {
      return response.data.category;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to create category',
      });
    }
  }
);

// Category slice
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch categories';
      })

      // Create category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.categories.push(action.payload);
        state.loading = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create category';
      });
  },
});

export default categorySlice.reducer;
