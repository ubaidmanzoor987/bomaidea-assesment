import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { appState } from './types';

export const initialState: appState = {
  pending: false,
  error: undefined,
  data: {}
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setData(state: appState, { payload }: PayloadAction<any>) {
      state.data = payload;
    },
    clearError(state: appState) {
      state.error = '';
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<appState>) => {},
});

export const { setData, clearError } = appSlice.actions;

export default appSlice.reducer;
