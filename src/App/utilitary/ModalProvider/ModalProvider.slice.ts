import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type RootState } from 'App/App.store.ts'
import {
    AgencyLockedFeaturesModalProps,
    ConversionConfirmDeleteProps,
    EditClientModalProps,
} from 'design/templates/Modal/index'
import { AccountInfo } from 'api/contracts/agency/entities/common'
import { ModalType } from 'design/templates/Modal/ModalTypes/types'

type Modals =
    | 'Static modal'
    | 'Modal with Props'

type ModalsWithoutProps = Exclude<
    Modals,
    | 'Static modal'
>

type ModalPropsVariants =
    | AgencyLockedFeaturesModalProps
    | EditClientModalProps
    | ConversionConfirmDeleteProps
    | UserId
    | undefined

export interface ModalControllerState<T extends ModalPropsVariants> {
    type: Modals | ModalType
    props: T
}

export type UserId = Pick<AccountInfo, 'id'>

const initialState: ModalControllerState<ModalPropsVariants> = {
    type: 'Closed',
    props: undefined,
}

export const modalProviderSlice = createSlice({
    name: 'modal controller',
    initialState,
    reducers: {
        openModal: (_, action: PayloadAction<{ type: ModalsWithoutProps }>) => {
            const { type } = action.payload

            return {
                type,
                props: undefined,
            }
        },
        openNoPropsModal: (_, action: PayloadAction<UserId>) => {
            return {
                type: 'Withdraw client invitation',
                props: action.payload,
            }
        },
        closeModal: () => initialState,
    },
})

export const {
    openModal,
    closeModal,
} = modalProviderSlice.actions

export const selectModalControllerState = (state: RootState) => state.modalController

export const modalController = modalProviderSlice.reducer
