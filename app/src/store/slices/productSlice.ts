import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '@/app/api/api';
import { NextApiRequest, NextApiResponse } from 'next';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  productImageUrl: string;
  categoryId: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Fetch products by storefront
export const fetchProducts = createAsyncThunk<Product[], string, { rejectValue: { message: string } }>(
  'product/fetchProducts',
  async (storefrontId, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, `/api/v1/${storefrontId}/products`, 'GET');

    if (response.status === 200) {
      return response.data.products;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to fetch products',
      });
    }
  }
);

// Create a product
export const createProduct = createAsyncThunk<Product, { storefrontId: string; newProduct: Product }, { rejectValue: { message: string } }>(
  'product/createProduct',
  async ({ storefrontId, newProduct }, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, `/api/v1/${storefrontId}/products`, 'POST', newProduct);

    if (response.status === 201) {
      return response.data.product;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to create product',
      });
    }
  }
);

// Update a product by ID
export const updateProduct = createAsyncThunk<Product, { storefrontId: string; productId: string; updatedProduct: Product }, { rejectValue: { message: string } }>(
  'product/updateProduct',
  async ({ storefrontId, productId, updatedProduct }, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, `/api/v1/${storefrontId}/products/${productId}`, 'PUT', updatedProduct);

    if (response.status === 200) {
      return response.data.updatedProduct;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to update product',
      });
    }
  }
);

// Delete a product by ID
export const deleteProduct = createAsyncThunk<string, { storefrontId: string; productId: string }, { rejectValue: { message: string } }>(
  'product/deleteProduct',
  async ({ storefrontId, productId }, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, `/api/v1/${storefrontId}/products/${productId}`, 'DELETE');

    if (response.status === 200) {
      return productId;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to delete product',
      });
    }
  }
);

// Product slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch products';
      })

      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create product';
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update product';
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete product';
      });
  },
});

export default productSlice.reducer;
