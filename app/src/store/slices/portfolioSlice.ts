import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Portfolio {
  id: string;
  fullName: string;
  skill: string;
  description: string | null;
  profilePhoto: string | null;
  projects?: any[];
  createdAt: string;
  updatedAt: string;
}

interface PortfolioState {
  portfolios: Portfolio[];
  portfolio: Portfolio | null;
  loading: boolean;
  error: string | null;
  fetchPortfoliosLoading: boolean;
  fetchPortfolioByIdLoading: boolean;
  createPortfolioLoading: boolean;
  updatePortfolioLoading: boolean;
  deletePortfolioLoading: boolean;
}

const initialState: PortfolioState = {
  portfolios: [],
  portfolio: null,
  loading: false, // Optional
  error: null,
  fetchPortfoliosLoading: false,
  fetchPortfolioByIdLoading: false,
  createPortfolioLoading: false,
  updatePortfolioLoading: false,
  deletePortfolioLoading: false,
};

export const fetchPortfolios = createAsyncThunk<
  Portfolio[],
  void,
  { rejectValue: { message: string } }
>("portfolio/fetchPortfolios", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/dashboard/portfolio");
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({
        message: errorData?.error || "Failed to fetch portfolios",
      });
    }
    return await response.json();
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || "Failed to fetch portfolios",
    });
  }
});

export const fetchPortfolioById = createAsyncThunk<
  Portfolio,
  string,
  { rejectValue: { message: string } }
>("portfolio/fetchPortfolioById", async (portfolioId, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/dashboard/portfolio/${portfolioId}`);
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({
        message: errorData?.error || "Failed to fetch portfolio",
      });
    }
    return await response.json();
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || "Failed to fetch portfolio",
    });
  }
});

export const createPortfolio = createAsyncThunk<
  Portfolio,
  Omit<Portfolio, "id" | "createdAt" | "updatedAt" | "projects">,
  { rejectValue: { message: string } }
>("portfolio/createPortfolio", async (newPortfolio, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/dashboard/portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPortfolio),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({
        message: errorData?.error || "Failed to create portfolio",
      });
    }
    return await response.json();
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || "Failed to create portfolio",
    });
  }
});

export const updatePortfolio = createAsyncThunk<
  Portfolio,
  {
    portfolioId: string;
    updatedData: Partial<
      Omit<Portfolio, "id" | "createdAt" | "updatedAt" | "projects">
    >;
  },
  { rejectValue: { message: string } }
>(
  "portfolio/updatePortfolio",
  async ({ portfolioId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/dashboard/portfolio/${portfolioId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({
          message: errorData?.error || "Failed to update portfolio",
        });
      }
      return await response.json();
    } catch (error: any) {
      return rejectWithValue({
        message: error.message || "Failed to update portfolio",
      });
    }
  }
);

export const deletePortfolio = createAsyncThunk<
  string,
  string,
  { rejectValue: { message: string } }
>("portfolio/deletePortfolio", async (portfolioId, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/dashboard/portfolio/${portfolioId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({
        message: errorData?.error || "Failed to delete portfolio",
      });
    }
    return portfolioId;
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || "Failed to delete portfolio",
    });
  }
});

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolios.pending, (state) => {
        state.fetchPortfoliosLoading = true;
        state.error = null;
        state.loading = true; //optional
      })
      .addCase(
        fetchPortfolios.fulfilled,
        (state, action: PayloadAction<Portfolio[]>) => {
          state.portfolios = action.payload;
          state.fetchPortfoliosLoading = false;
          state.loading = false;
        }
      )
      .addCase(fetchPortfolios.rejected, (state, action) => {
        state.fetchPortfoliosLoading = false;
        state.error = action.payload?.message || "Failed to fetch portfolios";
        state.loading = false;
      })
      .addCase(fetchPortfolioById.pending, (state) => {
        state.fetchPortfolioByIdLoading = true;
        state.error = null;
        state.portfolio = null;
        state.loading = true;
      })
      .addCase(
        fetchPortfolioById.fulfilled,
        (state, action: PayloadAction<Portfolio>) => {
          state.portfolio = action.payload;
          state.fetchPortfolioByIdLoading = false;
          state.loading = false;
        }
      )
      .addCase(fetchPortfolioById.rejected, (state, action) => {
        state.fetchPortfolioByIdLoading = false;
        state.error = action.payload?.message || "Failed to fetch portfolio";
        state.loading = false;
      })
      .addCase(createPortfolio.pending, (state) => {
        state.createPortfolioLoading = true;
        state.error = null;
      })
      .addCase(
        createPortfolio.fulfilled,
        (state, action: PayloadAction<Portfolio>) => {
          state.portfolios.push(action.payload);
          state.createPortfolioLoading = false;
          state.loading = false;
        }
      )
      .addCase(createPortfolio.rejected, (state, action) => {
        state.createPortfolioLoading = false;
        state.error = action.payload?.message || "Failed to create portfolio";
        state.loading = false;
      })
      .addCase(updatePortfolio.pending, (state) => {
        state.updatePortfolioLoading = true;
        state.error = null;
      })
      .addCase(
        updatePortfolio.fulfilled,
        (state, action: PayloadAction<Portfolio>) => {
          const index = state.portfolios.findIndex(
            (portfolio) => portfolio.id === action.payload.id
          );
          if (index !== -1) {
            state.portfolios[index] = action.payload;
          }
          state.updatePortfolioLoading = false;
          state.loading = false;
        }
      )
      .addCase(updatePortfolio.rejected, (state, action) => {
        state.updatePortfolioLoading = false;
        state.error = action.payload?.message || "Failed to update portfolio";
        state.loading = false;
      })
      .addCase(deletePortfolio.pending, (state) => {
        state.deletePortfolioLoading = true;
        state.error = null;
      })
      .addCase(
        deletePortfolio.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.portfolios = state.portfolios.filter(
            (portfolio) => portfolio.id !== action.payload
          );
          state.deletePortfolioLoading = false;
          state.loading = false;
        }
      )
      .addCase(deletePortfolio.rejected, (state, action) => {
        state.deletePortfolioLoading = false;
        state.error = action.payload?.message || "Failed to delete portfolio";
        state.loading = false;
      });
  },
});

export default portfolioSlice.reducer;
