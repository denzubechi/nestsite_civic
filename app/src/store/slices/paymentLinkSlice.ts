import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '@/app/api/api';
import { NextApiRequest, NextApiResponse } from 'next';

interface PaymentLink {
  id: string;
  name: string;
  description: string;
  amount: number;
}

interface PaymentLinkState {
  paymentLinks: PaymentLink[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentLinkState = {
  paymentLinks: [],
  loading: false,
  error: null,
};

// Fetch payment links
export const fetchPaymentLinks = createAsyncThunk<PaymentLink[], void, { rejectValue: { message: string } }>(
  'paymentLink/fetchPaymentLinks',
  async (_, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, '/api/v1/payment-links', 'GET');

    if (response.status === 200) {
      return response.data.paymentLinks;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to fetch payment links',
      });
    }
  }
);

// Create a payment link
export const createPaymentLink = createAsyncThunk<PaymentLink, PaymentLink, { rejectValue: { message: string } }>(
  'paymentLink/createPaymentLink',
  async (newPaymentLink: PaymentLink, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, '/api/v1/payment-links', 'POST', newPaymentLink);

    if (response.status === 201) {
      return response.data.paymentLink;
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to create payment link',
      });
    }
  }
);

const paymentLinkSlice = createSlice({
  name: 'paymentLink',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentLinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentLinks.fulfilled, (state, action: PayloadAction<PaymentLink[]>) => {
        state.paymentLinks = action.payload;
        state.loading = false;
      })
      .addCase(fetchPaymentLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch payment links';
      })
      .addCase(createPaymentLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentLink.fulfilled, (state, action: PayloadAction<PaymentLink>) => {
        state.paymentLinks.push(action.payload);
        state.loading = false;
      })
      .addCase(createPaymentLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create payment link';
      });
  },
});

export default paymentLinkSlice.reducer;
