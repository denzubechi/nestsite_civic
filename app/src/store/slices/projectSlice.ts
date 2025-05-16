import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Project {
  id: string;
  portfolioId: string;
  name: string;
  liveUrl: string | null;
  imageUrl: string | null;
  description: string | null;
}

interface ProjectState {
  projects: Project[];
  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  error: null,
};

const API_BASE_URL = "/api/dashboard";

export const fetchProjects = createAsyncThunk<
  Project[],
  string,
  { rejectValue: string }
>("project/fetchProjects", async (portfolioId, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/portfolio/${portfolioId}/project`
    );
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(
        errorData?.error ||
          `Failed to fetch projects for portfolio ${portfolioId}`
      );
    }
    const data = await response.json();
    return data as Project[];
  } catch (error: any) {
    return rejectWithValue(
      error?.message || `Failed to fetch projects for portfolio ${portfolioId}`
    );
  }
});

export const createProject = createAsyncThunk<
  Project,
  { portfolioId: string; newProject: Omit<Project, "id"> },
  { rejectValue: string }
>(
  "project/createProject",
  async ({ portfolioId, newProject }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newProject, portfolioId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData?.error || "Failed to create project");
      }
      const data = await response.json();
      return data as Project;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Failed to create project");
    }
  }
);

export const updateProject = createAsyncThunk<
  Project,
  { projectId: string; updatedProject: Partial<Omit<Project, "id">> },
  { rejectValue: string }
>(
  "project/updateProject",
  async ({ projectId, updatedProject }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/project/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData?.error || `Failed to update project with ID ${projectId}`
        );
      }
      const data = await response.json();
      return data as Project;
    } catch (error: any) {
      return rejectWithValue(
        error?.message || `Failed to update project with ID ${projectId}`
      );
    }
  }
);

export const deleteProject = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("project/deleteProject", async (projectId, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/project/${projectId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(
        errorData?.error || `Failed to delete project with ID ${projectId}`
      );
    }
    return projectId;
  } catch (error: any) {
    return rejectWithValue(
      error?.message || `Failed to delete project with ID ${projectId}`
    );
  }
});

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.projects = action.payload;
          state.fetchLoading = false;
        }
      )
      .addCase(fetchProjects.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload || "Failed to fetch projects";
      })
      .addCase(createProject.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(
        createProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.projects.push(action.payload);
          state.createLoading = false;
        }
      )
      .addCase(createProject.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload || "Failed to create project";
      })
      .addCase(updateProject.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(
        updateProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          const index = state.projects.findIndex(
            (project) => project.id === action.payload.id
          );
          if (index !== -1) {
            state.projects[index] = action.payload;
          }
          state.updateLoading = false;
        }
      )
      .addCase(updateProject.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload || "Failed to update project";
      })
      .addCase(deleteProject.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(
        deleteProject.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.projects = state.projects.filter(
            (project) => project.id !== action.payload
          );
          state.deleteLoading = false;
        }
      )
      .addCase(deleteProject.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload || "Failed to delete project";
      });
  },
});

export default projectSlice.reducer;
