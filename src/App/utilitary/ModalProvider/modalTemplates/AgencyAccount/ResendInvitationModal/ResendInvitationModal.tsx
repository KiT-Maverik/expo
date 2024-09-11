import { Modal, closeModal, selectModalControllerState, UserId, ModalControllerState } from 'design/templates/Modal'
import Button from '@mui/material/Button'
import { useAppDispatch, useAppSelector } from 'App'
import { useCallback } from 'react'
import { useResendInvitationMutation } from 'api/mutations/agency/useResendInvitationMutation'
import LoadingButton from '@mui/lab/LoadingButton'
import { useToast } from 'design/organisms/ToastProvider'
import { useApiErrorToast } from 'api/hooks'
import locale from './ResendInvitationModal.locale'

export const ResendInvitationModal = () => {
    const dispatch = useAppDispatch()
    const { showToast } = useToast()
    const { showApiErrorToast } = useApiErrorToast()
    const { resendInvitation } = useResendInvitationMutation()
    const { type, props } = useAppSelector(selectModalControllerState) as ModalControllerState<UserId>

    const handleClose = useCallback(() => {
        dispatch(closeModal())
    }, [])

    const handleInvitationResend = useCallback(() => {
        resendInvitation.mutateAsync(props.id, {
            onSuccess: () => {
                showToast({
                    message: locale.notification.sent,
                    type: 'info',
                })
                handleClose()
            },
            onError: (error) => showApiErrorToast(error),
        })
    }, [])

    return (
        <Modal open={type === 'Resend invitation'} onClose={handleClose} width="sm">
            <Modal.Header title={locale.title} onClose={handleClose} />
            <Modal.Actions>
                <Button variant="outlined" color="tertiary" onClick={handleClose}>
                    {locale.actions.cancel}
                </Button>
                <LoadingButton
                    loading={resendInvitation.isLoading}
                    variant="contained"
                    color="primary"
                    onClick={handleInvitationResend}
                >
                    {locale.actions.resend}
                </LoadingButton>
            </Modal.Actions>
        </Modal>
    )
}
