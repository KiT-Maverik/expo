import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { Modal } from 'design/templates/Modal'
import withErrorBoundary from 'design/molecules/WithErrorBoundary'

import locale from './ResetStatsConfirmationModal.locale'

type ResetStatsConfirmationModalProps = {
    open: boolean
    onClose: () => void
    onSubmit: () => void
}

export const ResetStatsConfirmationModal = ({ open, onClose, onSubmit }: ResetStatsConfirmationModalProps) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Modal.Header title={locale.title} onClose={onClose} />
            <Modal.Body>
                <Typography>{locale.description}</Typography>
            </Modal.Body>
            <Modal.Actions>
                <Button variant="text" onClick={onClose}>
                    {locale.cancel}
                </Button>
                <Button variant="contained" color="error" onClick={onSubmit} data-testid="resetStatsWarningId">
                    {locale.reset}
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default withErrorBoundary(ResetStatsConfirmationModal)
