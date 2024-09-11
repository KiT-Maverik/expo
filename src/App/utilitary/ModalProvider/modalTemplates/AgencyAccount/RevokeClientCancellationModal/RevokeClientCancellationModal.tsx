import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import { useCallback } from 'react'
import { useToast } from 'design/organisms/ToastProvider'
import { useAppDispatch, useAppSelector } from 'App'
import { closeModal, selectModalControllerState, Modal, ModalControllerState, UserId } from 'design/templates/Modal'
import { useRevokeAccountCancellationMutation } from 'api/mutations'
import { useApiErrorToast } from 'api/hooks'
import locale from './RevokeClientCancellationModal.locale'

export const RevokeClientCancellationModal = () => {
    const dispatch = useAppDispatch()
    const { showToast } = useToast()
    const { showApiErrorToast } = useApiErrorToast()
    const { revokeAccountCancellation } = useRevokeAccountCancellationMutation()
    const { type, props } = useAppSelector(selectModalControllerState) as ModalControllerState<UserId>

    const handleClose = useCallback(() => {
        dispatch(closeModal())
    }, [])

    const handleCancelAccount = useCallback(() => {
        revokeAccountCancellation.mutateAsync(props.id, {
            onSuccess: () => {
                showToast({
                    message: locale.notification.revoked,
                    type: 'success',
                })
                handleClose()
            },
            onError: (e) => showApiErrorToast(e),
        })
    }, [revokeAccountCancellation, props])

    return (
        <Modal open={type === 'Revoke client cancellation'} onClose={handleClose}>
            <Modal.Header title={locale.title} onClose={handleClose} />
            <Modal.Actions>
                <Button
                    disabled={revokeAccountCancellation.isLoading}
                    variant="outlined"
                    color="tertiary"
                    onClick={handleClose}
                >
                    {locale.actions.cancel}
                </Button>
                <LoadingButton
                    loading={revokeAccountCancellation.isLoading}
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
