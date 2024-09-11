import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type RootState } from 'App'
import { ModalsState, OpenModalPayload } from './types'

const initialState: ModalsState = {
    type: null,
    props: {},
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (_, action: PayloadAction<OpenModalPayload>) => {
            const { type, ...props } = action.payload

            return {
                type,
                props,
            }
        },
        closeModal: () => initialState,
    },
})

export const { openModal, closeModal } = modalSlice.actions

export const selectModalState = (state: RootState) => state.modal

export * from './types'

export const modal = modalSlice.reducer
