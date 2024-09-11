import { useAppSelector, useAppDispatch } from 'App'
import {
    PaymentMethodModal,
    FeatureLockedModal,
    LockedInteractiveVideosModal,
    EmbedCodeModal,
    EditEmailModal,
    EditUserModal,
    DeleteSubUserConfirmationModal,
    CloseAccountModal,
    CancelDowngradeModal,
    EmbedCodeModalVidConditions,
    CreditCardModal,
} from 'design/templates/Modal'

import useFeatureFlags from 'hooks/system/useFeatureFlags'
import { selectModalState, closeModal, ModalType } from './modal.slice'

const Modals = () => {
    const { type, props } = useAppSelector(selectModalState)
    const dispatch = useAppDispatch()
    const { vidConditions } = useFeatureFlags()

    const onClose = () => {
        dispatch(closeModal())
    }

    const propsWithActions = {
        ...props,
        onClose,
    }

    switch (type) {
        case ModalType.VIDEO_EMBED_CODE:
            return vidConditions ? (
                <EmbedCodeModalVidConditions {...propsWithActions} />
            ) : (
                <EmbedCodeModal {...propsWithActions} />
            )
        case ModalType.SMART_VID_EMBED_CODE:
            return <EmbedCodeModal {...propsWithActions} smartVid />
        case ModalType.PAYMENT_METHOD: // DEPRECATED. New design is CreditCardModal
            return <PaymentMethodModal {...propsWithActions} />
        case ModalType.CREDIT_CARD:
            return <CreditCardModal {...propsWithActions} />
        case ModalType.FEATURE_LOCKED:
            return <FeatureLockedModal {...propsWithActions} />
        case ModalType.EDIT_EMAIL:
            return <EditEmailModal {...propsWithActions} />
        case ModalType.EDIT_SUBUSER:
            return <EditUserModal {...propsWithActions} />
        case ModalType.DELETE_SUBUSER_CONFIRMATION:
            return <DeleteSubUserConfirmationModal {...propsWithActions} />
        case ModalType.CLOSE_ACCOUNT:
            return <CloseAccountModal {...propsWithActions} />
        case ModalType.CANCEL_DOWNGRADE:
            return <CancelDowngradeModal {...propsWithActions} />
        case ModalType.LOCKED_INTERACTIVE_VIDEOS:
            return <LockedInteractiveVideosModal {...propsWithActions} />
    }

    return null
}

export default Modals
