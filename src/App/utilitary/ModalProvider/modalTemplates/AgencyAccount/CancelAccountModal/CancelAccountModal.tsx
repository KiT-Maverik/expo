import Button from '@mui/material/Button'
import { useCallback } from 'react'
import { useToast } from 'design/organisms/ToastProvider'
import { useAppDispatch, useAppSelector } from 'App'
import { closeModal, selectModalControllerState, Modal } from 'design/templates/Modal'
import locale from './CancelAccountModal.locale'

export const CancelAccountModal = () => {
    const dispatch = useAppDispatch()
    const { showToast } = useToast()
    const { type } = useAppSelector(selectModalControllerState)

    const handleClose = useCallback(() => {
        dispatch(closeModal())
    }, [])

    const handleCancelAccount = useCallback(() => {
        showToast({
            message: locale.notification.cancel,
            type: 'info',
        })
        handleClose()
    }, [])

    return (
        <Modal open={type === 'Cancel account'} onClose={handleClose} width="sm">
            <Modal.Header title={locale.title} onClose={handleClose} />
            <Modal.Actions>
                <Button variant="outlined" color="tertiary" onClick={handleClose}>
                    {locale.actions.cancel}
                </Button>
                <Button variant="contained" color="error" onClick={handleCancelAccount}>
                    {locale.actions.confirm}
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
