import { useCallback } from 'react'
import { Button, CircularProgress, Stack, Typography } from '@mui/material'

import { Modal } from 'design/templates/Modal'
import CloseButton from 'design/pages/Funnel/VideoSelection/VideoSelector/Modal/CloseButton'
import { useCustomerSubscriptionQuery } from 'api/queries'
import { useUpdateCreditCardByTokenMutation } from 'api/mutations'
import CreditCardForm from 'design/molecules/CreditCardForm'

import locale from './CreditCardModal.locale'

type CreditCardModalProps = {
    onClose: () => void
}

export const CreditCardModal = ({ onClose }: CreditCardModalProps) => {
    const { data: subscription, isLoading } = useCustomerSubscriptionQuery()
    const updateCreditCardByTokenMutation = useUpdateCreditCardByTokenMutation()

    const onApply = useCallback(async (token: string) => {
        await updateCreditCardByTokenMutation.mutateAsync({
            token,
        })

        onClose()
    }, [])

    const creditCard = subscription?.creditCard || null

    return (
        <Modal open onClose={onClose}>
            <Modal.Header nodeTitle>
                <Typography variant="h7">{creditCard ? locale.edit : locale.add}</Typography>
                <CloseButton onClose={onClose} />
            </Modal.Header>
            <Modal.Body>
                {isLoading && (
                    <Stack direction="row" justifyContent="center">
                        <CircularProgress />
                    </Stack>
                )}
                {!isLoading && (
                    <CreditCardForm
                        onApply={onApply}
                        creditCard={creditCard}
                        actions={
                            <Button onClick={onClose} variant="outlined" color="tertiary">
                                {locale.cancel}
                            </Button>
                        }
                    />
                )}
            </Modal.Body>
        </Modal>
    )
}

export default CreditCardModal
