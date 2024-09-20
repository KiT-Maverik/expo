import { createSlice } from '@reduxjs/toolkit'

import { type RootState } from 'App/App.store.ts'

export interface AppState {
	showLeftDrawer: boolean
	showRightDrawer: boolean
	showLoader: boolean
}

const initialState: AppState = {
    showLeftDrawer: false,
    showRightDrawer: false,
    showLoader: false,
}

export const appSlice = createSlice({
	name: 'App',
    initialState,
    reducers: {
        openLeftDrawer: (state): AppState => ({
            ...state,
            showLeftDrawer: true,
        }),
        closeLeftDrawer: (state): AppState => ({
            ...state,
            showLeftDrawer: false,
        }),
        openRightDrawer: (state): AppState => ({
            ...state,
            showRightDrawer: true,
        }),
        closeRightDrawer: (state): AppState => ({
            ...state,
            showRightDrawer: false,
        }),
        showLoader: (state): AppState => ({
            ...state,
            showLoader: true,
        }),
        hideLoader: (state): AppState => ({
            ...state,
            showLoader: false,
        }),
    },
})

export const {
    openLeftDrawer,
    closeLeftDrawer,
    openRightDrawer,
    closeRightDrawer,
    showLoader,
    hideLoader,
} = appSlice.actions

export const selectAppState = (state: RootState) => state.app

export const app = appSlice.reducer
