import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Storefront {
  id: string;
  name: string;
  imageUrl: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

interface StorefrontState {
  storefronts: Storefront[];
  storefront: Storefront | null;
  fetchStorefrontsLoading: boolean;
  fetchStorefrontByIdLoading: boolean;
  createStorefrontLoading: boolean;
  updateStorefrontLoading: boolean;
  deleteStorefrontLoading: boolean;
  error: string | null;
}

const initialState: StorefrontState = {
  storefronts: [],
  storefront: null,
  fetchStorefrontsLoading: false,
  fetchStorefrontByIdLoading: false,
  createStorefrontLoading: false,
  updateStorefrontLoading: false,
  deleteStorefrontLoading: false,
  error: null,
};

// Fetch all storefronts
export const fetchStorefronts = createAsyncThunk<
  Storefront[],
  void,
  { rejectValue: { message: string } }
>("storefront/fetchStorefronts", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/dashboard/storefronts");
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({
        message: errorData?.error || "Failed to fetch storefronts",
      });
    }
    return await response.json();
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || "Failed to fetch storefronts",
    });
  }
});

// Fetch a single storefront by ID
export const fetchStorefrontById = createAsyncThunk<
  Storefront,
  string,
  { rejectValue: { message: string } }
>(
  "storefront/fetchStorefrontById",
  async (storefrontId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/dashboard/storefronts/${storefrontId}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({
          message: errorData?.error || "Failed to fetch storefront",
        });
      }
      return await response.json();
    } catch (error: any) {
      return rejectWithValue({
        message: error.message || "Failed to fetch storefront",
      });
    }
  }
);

// Create a storefront
export const createStorefront = createAsyncThunk<
  Storefront,
  Omit<Storefront, "id" | "createdAt" | "updatedAt">,
  { rejectValue: { message: string } }
>("storefront/createStorefront", async (newStorefront, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/dashboard/storefronts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStorefront),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({
        message: errorData?.error || "Failed to create storefront",
      });
    }
    return await response.json();
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || "Failed to create storefront",
    });
  }
});

// Update a storefront by ID
export const updateStorefront = createAsyncThunk<
  Storefront,
  {
    storefrontId: string;
    updatedData: Partial<Omit<Storefront, "id" | "createdAt" | "updatedAt">>;
  },
  { rejectValue: { message: string } }
>(
  "storefront/updateStorefront",
  async ({ storefrontId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/dashboard/storefronts/${storefrontId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({
          message: errorData?.error || "Failed to update storefront",
        });
      }
      return await response.json();
    } catch (error: any) {
      return rejectWithValue({
        message: error.message || "Failed to update storefront",
      });
    }
  }
);

// Delete a storefront by ID
export const deleteStorefront = createAsyncThunk<
  string,
  string,
  { rejectValue: { message: string } }
>("storefront/deleteStorefront", async (storefrontId, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/dashboard/storefronts/${storefrontId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({
        message: errorData?.error || "Failed to delete storefront",
      });
    }
    return storefrontId;
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || "Failed to delete storefront",
    });
  }
});

const storefrontSlice = createSlice({
  name: "storefront",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all storefronts
      .addCase(fetchStorefronts.pending, (state) => {
        state.fetchStorefrontsLoading = true;
        state.error = null;
      })
      .addCase(
        fetchStorefronts.fulfilled,
        (state, action: PayloadAction<Storefront[]>) => {
          state.storefronts = action.payload;
          state.fetchStorefrontsLoading = false;
        }
      )
      .addCase(fetchStorefronts.rejected, (state, action) => {
        state.fetchStorefrontsLoading = false;
        state.error = action.payload?.message || "Failed to fetch storefronts";
      })

      // Fetch single storefront
      .addCase(fetchStorefrontById.pending, (state) => {
        state.fetchStorefrontByIdLoading = true;
        state.error = null;
        state.storefront = null;
      })
      .addCase(
        fetchStorefrontById.fulfilled,
        (state, action: PayloadAction<Storefront>) => {
          state.storefront = action.payload;
          state.fetchStorefrontByIdLoading = false;
        }
      )
      .addCase(fetchStorefrontById.rejected, (state, action) => {
        state.fetchStorefrontByIdLoading = false;
        state.error = action.payload?.message || "Failed to fetch storefront";
      })

      // Create storefront
      .addCase(createStorefront.pending, (state) => {
        state.createStorefrontLoading = true;
        state.error = null;
      })
      .addCase(
        createStorefront.fulfilled,
        (state, action: PayloadAction<Storefront>) => {
          state.storefronts.push(action.payload);
          state.createStorefrontLoading = false;
        }
      )
      .addCase(createStorefront.rejected, (state, action) => {
        state.createStorefrontLoading = false;
        state.error = action.payload?.message || "Failed to create storefront";
      })

      // Update storefront
      .addCase(updateStorefront.pending, (state) => {
        state.updateStorefrontLoading = true;
        state.error = null;
      })
      .addCase(
        updateStorefront.fulfilled,
        (state, action: PayloadAction<Storefront>) => {
          const index = state.storefronts.findIndex(
            (storefront) => storefront.id === action.payload.id
          );
          if (index !== -1) {
            state.storefronts[index] = action.payload;
          }
          state.updateStorefrontLoading = false;
        }
      )
      .addCase(updateStorefront.rejected, (state, action) => {
        state.updateStorefrontLoading = false;
        state.error = action.payload?.message || "Failed to update storefront";
      })

      // Delete storefront
      .addCase(deleteStorefront.pending, (state) => {
        state.deleteStorefrontLoading = true;
        state.error = null;
      })
      .addCase(
        deleteStorefront.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.storefronts = state.storefronts.filter(
            (storefront) => storefront.id !== action.payload
          );
          state.deleteStorefrontLoading = false;
        }
      )
      .addCase(deleteStorefront.rejected, (state, action) => {
        state.deleteStorefrontLoading = false;
        state.error = action.payload?.message || "Failed to delete storefront";
      });
  },
});

export default storefrontSlice.reducer;
