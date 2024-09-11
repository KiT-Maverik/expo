import { Typography } from '@mui/material'

import { Modal } from 'design/templates/Modal'
import CloseButton from 'design/pages/Funnel/VideoSelection/VideoSelector/Modal/CloseButton'
import { useCustomerSubscriptionQuery } from 'api/queries'
import ChargifyForm from './ChargifyForm/ChargifyForm'

import locale from './PaymentMethodModal.locale'

type PaymentMethodModalProps = {
    planTransition?: boolean
    onClose: () => void
}

export const PaymentMethodModal = ({ planTransition, onClose }: PaymentMethodModalProps) => {
    const { data: subscription } = useCustomerSubscriptionQuery()

    return (
        <Modal open onClose={onClose}>
            <Modal.Header nodeTitle>
                <Typography variant="h5">
                    {subscription?.creditCard ? 'Edit' : 'Add'} {locale.title}
                </Typography>
                <CloseButton onClose={onClose} />
            </Modal.Header>
            <Modal.Body>
                <ChargifyForm onClose={onClose} planTransition={planTransition} />
            </Modal.Body>
        </Modal>
    )
}
