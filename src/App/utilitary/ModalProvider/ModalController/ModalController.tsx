import { useAppSelector } from 'App'
import {
    selectModalControllerState,
    AgencyLockedFeaturesModal,
    ResendInvitationModal,
    CancelAccountModal,
    ResendCancellationEmailModal,
    RevokeAgencyAccessModal,
    EditClientModal,
    RemoveClientModal,
    CreateClientModal,
    RevokeClientCancellationModal,
    WithdrawClientInvitationModal,
    ConversionConfirmDeleteModal,
} from 'design/templates/Modal'

export const ModalController = () => {
    const { type } = useAppSelector(selectModalControllerState)

    switch (type) {
        case 'Cancel account':
            return <CancelAccountModal />
        case 'Agency locked features':
            return <AgencyLockedFeaturesModal />
        case 'Create agency client modal':
            return <CreateClientModal />
        case 'Resend cancellation email':
            return <ResendCancellationEmailModal />
        case 'Remove client':
            return <RemoveClientModal />
        case 'Resend invitation':
            return <ResendInvitationModal />
        case 'Revoke agency access':
            return <RevokeAgencyAccessModal />
        case 'Withdraw client invitation':
            return <WithdrawClientInvitationModal />
        case 'Revoke client cancellation':
            return <RevokeClientCancellationModal />
        case 'Edit user':
            return <EditClientModal />
        case 'Confirm delete conversion':
            return <ConversionConfirmDeleteModal />
    }

    return null
}
