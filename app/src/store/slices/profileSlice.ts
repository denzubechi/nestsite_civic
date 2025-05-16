// profileSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '@/app/api/api';
import { NextApiRequest, NextApiResponse } from 'next';

interface Profile {
  id: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string;
  secondaryEmail: string | null;
  profilePhoto: string | null;
  role: string;
  emailVerified: boolean;
  accountVerified: boolean;
  phoneNumber: string | null;
  address: string | null;
  countryRegion: string | null;
  instagramURL: string | null;
  facebookURL: string | null;
  tiktokURL: string | null;
  twitterURL: string | null;
  createdAt: string;
  updatedAt: string;
  subscriptionPlanId: string | null;
  twoFactorEnabled: boolean;
}

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

// Async thunk to fetch profile
export const fetchProfile = createAsyncThunk<Profile, void, { rejectValue: { message: string } }>(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, '/api/v1/merchant/profile', 'GET');

    if (response.status === 200) {
      return response.data.merchant; // Assuming the response structure returns `merchant` data
    } else {
      return rejectWithValue({
        message: response.message || 'Failed to fetch profile',
      });
    }
  }
);

// Async thunk to update profile
export const updateProfile = createAsyncThunk<Profile, Profile, { rejectValue: { message: string } }>(
  'profile/updateProfile',
  async (updatedProfile: Profile, { rejectWithValue }) => {
    const req = {} as NextApiRequest;
    const res = {} as NextApiResponse;

    const response = await apiRequest(req, res, '/api/v1/merchant/update-profile', 'PUT', updatedProfile);

    if (response.status === 200 || response.status === 201) {
      return updatedProfile;
    } else {
      return rejectWithValue({
        message: response.message || 'Profile update failed',
      });
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
      state.error = null;
      state.loading = false;
    },
    clearProfileData: (state) => {
      state.profile = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch profile';
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update profile';
      });
  },
});

export const { setProfileData, clearProfileData } = profileSlice.actions;
export default profileSlice.reducer;
