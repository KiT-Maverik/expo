import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type RootState } from 'App'
import {
    AgencyLockedFeaturesModalProps,
    ConversionConfirmDeleteProps,
    EditClientModalProps,
} from 'design/templates/Modal/index'
import { AccountInfo } from 'api/contracts/agency/entities/common'
import { ModalType } from 'design/templates/Modal/ModalTypes/types'

type Modals =
    | 'Agency locked features'
    | 'Create agency client modal'
    | 'Edit user'
    | 'Cancel account'
    | 'Remove client'
    | 'Resend cancellation email'
    | 'Resend invitation'
    | 'Revoke agency access'
    | 'Revoke client cancellation'
    | 'Withdraw client invitation'
    | 'Closed'
    | 'Confirm delete conversion'

type ModalsWithoutProps = Exclude<
    Modals,
    | 'Confirm agency management'
    | 'Resend invitation'
    | 'Resend cancellation email'
    | 'Revoke client cancellation'
    | 'Revoke client invitation'
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

export const modalControllerSlice = createSlice({
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
        openWithdrawClientInvitationModal: (_, action: PayloadAction<UserId>) => {
            return {
                type: 'Withdraw client invitation',
                props: action.payload,
            }
        },
        openAgencyLockedFeaturesModal: (_, action: PayloadAction<AgencyLockedFeaturesModalProps>) => {
            return {
                type: 'Agency locked features',
                props: action.payload,
            }
        },
        openEditClientModal: (_, action: PayloadAction<EditClientModalProps>) => {
            return {
                type: 'Edit user',
                props: action.payload,
            }
        },
        openRevokeClientCancellationModal: (_, action: PayloadAction<UserId>) => {
            return {
                type: 'Revoke client cancellation',
                props: action.payload,
            }
        },
        openResendCancellationEmailModal: (_, action: PayloadAction<UserId>) => {
            return {
                type: 'Resend cancellation email',
                props: action.payload,
            }
        },
        openResendInvitationModal: (_, action: PayloadAction<UserId>) => {
            return {
                type: 'Resend invitation',
                props: action.payload,
            }
        },
        openRemoveClientModal: (_, action: PayloadAction<UserId>) => {
            return {
                type: 'Remove client',
                props: action.payload,
            }
        },
        openConversionConfirmDeleteModal: (_, action: PayloadAction<ConversionConfirmDeleteProps>) => {
            return {
                type: 'Confirm delete conversion',
                props: action.payload,
            }
        },
        closeModal: () => initialState,
    },
})

export const {
    openModal,
    openAgencyLockedFeaturesModal,
    openEditClientModal,
    openResendCancellationEmailModal,
    openRevokeClientCancellationModal,
    openWithdrawClientInvitationModal,
    openResendInvitationModal,
    openRemoveClientModal,
    openConversionConfirmDeleteModal,
    closeModal,
} = modalControllerSlice.actions

export const selectModalControllerState = (state: RootState) => state.modalController

export const modalController = modalControllerSlice.reducer
