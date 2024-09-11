import { Modal, closeModal, selectModalControllerState } from 'design/templates/Modal'
import Button from '@mui/material/Button'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'App'
import { useRevokeAgencyAccessMutation } from 'api/mutations'
import { useToast } from 'design/organisms/ToastProvider'
import { useApiErrorToast } from 'api/hooks'
import locale from './RevokeAgencyAccessModal.locale'

export const RevokeAgencyAccessModal = () => {
    const dispatch = useAppDispatch()
    const { showToast } = useToast()
    const { showApiErrorToast } = useApiErrorToast()
    const { revokeAgencyAccess } = useRevokeAgencyAccessMutation()
    const { type } = useAppSelector(selectModalControllerState)

    const handleClose = useCallback(() => {
        dispatch(closeModal())
    }, [])

    const handleRevokeAgencyAccess = useCallback(() => {
        revokeAgencyAccess.mutateAsync(undefined, {
            onSuccess: ({ businessName }) => {
                showToast({
                    type: 'info',
                    title: locale.notification.accessRevoked.title,
                    message: locale.notification.accessRevoked.message(businessName),
                })
                handleClose()
            },
            onError: (error) => showApiErrorToast(error),
        })
    }, [])

    return (
        <Modal open={type === 'Revoke agency access'} onClose={handleClose}>
            <Modal.Header title={locale.title} onClose={handleClose} />
            <Modal.Body>{locale.message}</Modal.Body>
            <Modal.Actions>
                <Button variant="outlined" color="tertiary" onClick={handleClose}>
                    {locale.actions.cancel}
                </Button>
                <Button variant="contained" color="error" onClick={handleRevokeAgencyAccess}>
                    {locale.actions.resend}
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
