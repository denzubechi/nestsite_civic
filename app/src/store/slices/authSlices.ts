import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Merchant {
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
    subscriptionPlanId: string | null;
    createdAt: string;
    updatedAt: string;
}

interface AuthState {
    token: string | null;
    merchant: Merchant | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: null,
    merchant: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<{ token: string; merchant: Merchant }>) => {
            state.token = action.payload.token;
            state.merchant = action.payload.merchant;
            state.isAuthenticated = true;
        },
        clearAuthData: (state) => {
            state.token = null;
            state.merchant = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
