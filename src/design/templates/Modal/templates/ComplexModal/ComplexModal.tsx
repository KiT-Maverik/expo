import { Button } from '@mui/material'

import { Modal, useHandleModalClose } from 'design/templates'
import {
    ModalProviderState,
    selectModalProviderState,
    useAppSelector,
} from 'App'

export interface ComplexModalProps {
	title: string
}

export const ComplexModal = () => {
	const { handleModalClose } = useHandleModalClose()
    const { props } = useAppSelector(
        selectModalProviderState,
	) as ModalProviderState<ComplexModalProps>

    return (
        <Modal open onClose={handleModalClose} width="md">
            <Modal.Header onClose={handleModalClose} title={props.title} />
            <Modal.Body>This modal has props</Modal.Body>
            <Modal.Actions>
                <Button variant="outlined" onClick={handleModalClose}>
					Close
                </Button>
            </Modal.Actions>
        </Modal>
	)
}
