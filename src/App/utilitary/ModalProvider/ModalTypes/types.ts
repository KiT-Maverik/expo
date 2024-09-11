import { FeatureLockedOpenModalPayload, FeatureLockedProps } from 'design/templates/Modal'
import { SubUser } from 'types/SubUser'

export enum ModalType {
    VIDEO_EMBED_CODE = 'VIDEO_EMBED_CODE',
    SMART_VID_EMBED_CODE = 'SMART_VID_EMBED_CODE',
    PAYMENT_METHOD = 'PAYMENT_METHOD',
    CREDIT_CARD = 'CREDIT_CARD',
    FEATURE_LOCKED = 'FEATURE_LOCKED',
    CLOSE_ACCOUNT = 'CLOSE_ACCOUNT',
    CANCEL_DOWNGRADE = 'CANCEL_DOWNGRADE',
    EDIT_EMAIL = 'EDIT_EMAIL',
    EDIT_SUBUSER = 'EDIT_SUBUSER',
    DELETE_SUBUSER_CONFIRMATION = 'DELETE_SUBUSER_CONFIRMATION',
    LOCKED_INTERACTIVE_VIDEOS = 'LOCKED_INTERACTIVE_VIDEOS',
}

export interface ModalDefaultProps {
    onClose: () => void
}

export interface VideoEmbedCodeProps {
    videoId?: string
}

export interface VideoEmbedCodeOpenModalPayload extends VideoEmbedCodeProps {
    type: ModalType.VIDEO_EMBED_CODE
}

export interface SmartVidEmbedCodeProps extends VideoEmbedCodeProps {
    funnelId?: string
}

export interface SmartVidEmbedCodeOpenModalPayload extends SmartVidEmbedCodeProps {
    type: ModalType.SMART_VID_EMBED_CODE
}

export interface PaymentMethodProps {
    form?: { a: number }
}

export interface PaymentMethodPropsOpenModalPayload extends PaymentMethodProps {
    type: ModalType.PAYMENT_METHOD
    planTransition?: boolean
}

export interface CreditCardOpenModalPayload {
    type: ModalType.CREDIT_CARD
}

export interface EditSubUserProps {
    open?: boolean
    subUser?: SubUser
}

export interface DeleteSubUserConfirmationProps {
    subUsers?: SubUser | SubUser[]
}

export interface LockedInteractiveVideosProps {
    containerRef?: HTMLDivElement
}

export interface CloseAccountOpenModalPayload {
    type: ModalType.CLOSE_ACCOUNT
}

export interface CancelDowngradeOpenModalPayload {
    type: ModalType.CANCEL_DOWNGRADE
}

export interface EditEmailOpenModalPayload {
    type: ModalType.EDIT_EMAIL
}

export interface EditSubUserOpenModalPayload extends EditSubUserProps {
    type: ModalType.EDIT_SUBUSER
}

export interface DeleteSubUserConfirmationOpenModalPayload extends DeleteSubUserConfirmationProps {
    type: ModalType.DELETE_SUBUSER_CONFIRMATION
}

export interface LockedInteractiveVideosOpenModalPayload extends LockedInteractiveVideosProps {
    type: ModalType.LOCKED_INTERACTIVE_VIDEOS
}

export type OpenModalPayload =
    | VideoEmbedCodeOpenModalPayload
    | SmartVidEmbedCodeOpenModalPayload
    | PaymentMethodPropsOpenModalPayload
    | CreditCardOpenModalPayload
    | FeatureLockedOpenModalPayload
    | CloseAccountOpenModalPayload
    | CancelDowngradeOpenModalPayload
    | EditEmailOpenModalPayload
    | EditSubUserOpenModalPayload
    | DeleteSubUserConfirmationOpenModalPayload
    | LockedInteractiveVideosOpenModalPayload

export type ModalsState = {
    type: ModalType | null
    props:
        | VideoEmbedCodeProps
        | SmartVidEmbedCodeProps
        | PaymentMethodProps
        | FeatureLockedProps
        | EditSubUserProps
        | DeleteSubUserConfirmationProps
        | LockedInteractiveVideosProps
}
