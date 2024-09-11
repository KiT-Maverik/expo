import { Button, Stack, Typography } from '@mui/material'

import { Modal } from 'design/templates/Modal'

import locale from './CloseAccountModal.locale'

type CloseAccountModalProps = {
    onClose: () => void
}

export const CloseAccountModal = ({ onClose }: CloseAccountModalProps) => {
    return (
        <Modal open onClose={onClose} width="md">
            <Modal.Header onClose={onClose}>
                <Stack width={1}>
                    <Typography variant="h5">{locale.closeAccount}</Typography>
                </Stack>
            </Modal.Header>
            <Modal.Body>{locale.description}</Modal.Body>
            <Modal.Actions>
                <Button variant="outlined" onClick={onClose}>
                    {locale.close}
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default CloseAccountModal
