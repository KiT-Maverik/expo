import { useFormikContext } from 'formik'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

import { Modal } from 'design/templates/Modal'

interface ActionsProps {
    onClose(): void
    isMutationLoading: boolean
}

export const Actions = ({ onClose, isMutationLoading }: ActionsProps) => {
    const { isValidating, submitForm } = useFormikContext()

    return (
        <Modal.Actions>
            <Button color="primary" variant="outlined" onClick={onClose}>
                Cancel
            </Button>
            <LoadingButton
                color="primary"
                variant="contained"
                onClick={submitForm}
                disabled={!isValidating && isMutationLoading}
                loading={!isValidating && isMutationLoading}
            >
                Save
            </LoadingButton>
        </Modal.Actions>
    )
}
