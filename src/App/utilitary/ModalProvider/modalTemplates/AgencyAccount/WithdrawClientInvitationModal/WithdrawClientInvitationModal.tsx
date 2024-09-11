import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import { useCallback } from 'react'
import { useToast } from 'design/organisms/ToastProvider'
import { useAppDispatch, useAppSelector } from 'App'
import { closeModal, selectModalControllerState, Modal, ModalControllerState, UserId } from 'design/templates/Modal'
import { useCancelInvitationMutation } from 'api/mutations'
import { useApiErrorToast } from 'api/hooks'
import locale from './WithdrawClientInvitationModal.locale'

export const WithdrawClientInvitationModal = () => {
    const dispatch = useAppDispatch()
    const { showToast } = useToast()
    const { showApiErrorToast } = useApiErrorToast()
    const { cancelInvitation } = useCancelInvitationMutation()
    const { type, props } = useAppSelector(selectModalControllerState) as ModalControllerState<UserId>

    const handleClose = useCallback(() => {
        dispatch(closeModal())
    }, [])

    const handleCancelAccount = useCallback(() => {
        cancelInvitation.mutateAsync(props.id, {
            onSuccess: () => {
                showToast({
                    message: locale.notification.revoked,
                    type: 'info',
                })
                handleClose()
            },
            onError: (e) => showApiErrorToast(e),
        })
    }, [cancelInvitation, props])

    return (
        <Modal open={type === 'Withdraw client invitation'} onClose={handleClose} width="sm">
            <Modal.Header title={locale.title} onClose={handleClose} />
            <Modal.Actions>
                <Button disabled={cancelInvitation.isLoading} variant="outlined" color="tertiary" onClick={handleClose}>
                    {locale.actions.cancel}
                </Button>
                <LoadingButton
                    loading={cancelInvitation.isLoading}
                    variant="contained"
                    color="error"
                    onClick={handleCancelAccount}
                >
                    {locale.actions.revoke}
                </LoadingButton>
            </Modal.Actions>
        </Modal>
    )
}
