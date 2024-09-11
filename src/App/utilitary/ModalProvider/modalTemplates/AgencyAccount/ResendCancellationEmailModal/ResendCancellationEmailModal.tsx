import Button from '@mui/material/Button'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'App'
import { useResendCancellationEmailMutation } from 'api/mutations/agency/useResendCancellationEmailMutation'
import { Modal, closeModal, selectModalControllerState, ModalControllerState, UserId } from 'design/templates/Modal'
import { useToast } from 'design/organisms/ToastProvider'
import { useApiErrorToast } from 'api/hooks'
import locale from './ResendCancellationEmailModal.locale'

export const ResendCancellationEmailModal = () => {
    const dispatch = useAppDispatch()
    const { showToast } = useToast()
    const { showApiErrorToast } = useApiErrorToast()
    const { resendCancellationEmail } = useResendCancellationEmailMutation()
    const { type, props } = useAppSelector(selectModalControllerState) as ModalControllerState<UserId>

    const handleClose = useCallback(() => {
        dispatch(closeModal())
    }, [])

    const handleResendCancellationEmail = useCallback(() => {
        resendCancellationEmail.mutateAsync(props.id, {
            onSuccess: () => {
                showToast({ type: 'info', message: locale.notification.sent })
                handleClose()
            },
            onError: (error) => showApiErrorToast(error),
        })
    }, [])

    return (
        <Modal open={type === 'Resend cancellation email'} onClose={handleClose} width="sm">
            <Modal.Header title={locale.title} onClose={handleClose} />
            <Modal.Actions>
                <Button variant="outlined" color="tertiary" onClick={handleClose}>
                    {locale.actions.cancel}
                </Button>
                <Button variant="contained" color="error" onClick={handleResendCancellationEmail}>
                    {locale.actions.resend}
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
