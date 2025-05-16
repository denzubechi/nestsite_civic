import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlices';
import totalsReducer from './slices/totalSlice';
import profileReducer from './slices/profileSlice';
import storefrontReducer from './slices/storefrontSlice'; // Import storefront slice
import productReducer from './slices/productSlice'; // Import product slice
import portfolioReducer from './slices/portfolioSlice'; // Import portfolio slice
import projectReducer from './slices/projectSlice'; // Import project slice
import paymentLinkReducer from './slices/paymentLinkSlice'; // Import payment link slice
import categoryReducer from './slices/categorySlice';
import neststoreReducer from './slices/neststoreSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    totals: totalsReducer,
    profile: profileReducer,
    storefront: storefrontReducer, // Add storefront reducer
    product: productReducer, // Add product reducer
    portfolio: portfolioReducer, // Add portfolio reducer
    project: projectReducer, // Add project reducer
    paymentLink: paymentLinkReducer, // Add payment link reducer
    category:categoryReducer,
    neststore:neststoreReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
