import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { closeModal, Modal, ModalControllerState, selectModalControllerState } from 'design/templates/Modal'
import { useDeleteConversionMutation } from 'api/mutations'
import { useAppDispatch, useAppSelector } from 'App'
import { locale } from 'locales'
import modalLocale from './ConversionConfirmationDeleteModal.locale'

export type ConversionConfirmDeleteProps = {
    selectedConversions: string[]
}

export const ConversionConfirmDeleteModal = () => {
    const deleteConversionMutation = useDeleteConversionMutation()
    const dispatch = useAppDispatch()

    const {
        type,
        props: { selectedConversions },
    } = useAppSelector(selectModalControllerState) as ModalControllerState<ConversionConfirmDeleteProps>

    const onClose = () => {
        dispatch(closeModal())
    }

    const isMultipleSelected = selectedConversions.length > 2

    const handleDelete = () => {
        void deleteConversionMutation.mutateAsync(selectedConversions)

        onClose()
    }

    return (
        <Modal open={type === 'Confirm delete conversion'} onClose={onClose}>
            <Modal.Header title={modalLocale.title(isMultipleSelected)} onClose={onClose} />
            <Modal.Body>
                <Typography>{modalLocale.message(isMultipleSelected)}</Typography>
            </Modal.Body>
            <Modal.Actions>
                <Button variant="outlined" color="tertiary" onClick={onClose}>
                    {locale.operations.generic.cancel}
                </Button>
                <Button variant="contained" color="error" onClick={handleDelete}>
                    {locale.operations.entity.delete}
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
