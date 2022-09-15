import { getAllProjects } from '@/services/app';
import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { appState } from './types';

export const initialState: appState = {
  pending: false,
  error: '',
  userId: '',
  isBack: false,
  projects: [],
  projectId: ''
};

export const allProjectsThunk = createAsyncThunk('app/allProjectsThunk', async (userId: string) => {
  return await getAllProjects(userId);
});

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsBack: (state: appState, action: PayloadAction<boolean>) => {
      state.isBack = action.payload;
    },
    setUserId: (state: appState, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setProjectId: (state: appState, action: PayloadAction<string>) => {
      state.projectId = action.payload;
    },
    clearError(state: appState) {
      state.error = '';
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<appState>) => {
    // Pending state of API
    builder.addCase(allProjectsThunk.pending, (state: appState) => {
      state.pending = true;
    });

    // On getting API response
    builder.addCase(allProjectsThunk.fulfilled, (state: appState, { payload }) => {
      state.pending = false;
      state.projects = payload.response.data;
    });

    // On promise rejection
    builder.addCase(allProjectsThunk.rejected, (state: appState, { error, payload }) => {
      state.pending = false;
      state.projects = [];
      state.error = error.message;
    });
  },
});

export const { clearError, setIsBack, setUserId, setProjectId } = appSlice.actions;

export default appSlice.reducer;
