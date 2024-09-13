import { createSlice } from "@reduxjs/toolkit";

import { type RootState } from "App/App.store.ts";

export interface AppState {
  showDrawer: boolean;
  showLoader: boolean;
}

const initialState: AppState = {
  showDrawer: false,
  showLoader: false,
};

export const appSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    openDrawer: (state) => ({
      ...state,
      showDrawer: true,
    }),
    closeDrawer: (state) => ({
      ...state,
      showDrawer: false,
    }),
    showLoader: (state) => ({
      ...state,
      showLoader: true,
    }),
    hideLoader: (state) => ({
      ...state,
      showLoader: false,
    }),
  },
});

export const { openDrawer, closeDrawer, showLoader, hideLoader } =
  appSlice.actions;

export const selectAppState = (state: RootState) => state.app;

export const app = appSlice.reducer;
