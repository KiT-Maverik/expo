import { useCallback } from 'react'
import { Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { Modal } from 'design/templates/Modal'
import usePlanUsageInfo from 'design/organisms/Account/usePlanUsageInfo'
import { useActivatePlanMutation } from 'api/mutations'

import locale from './CancelDowngradeModal.locale'

type CancelDowngradeModalProps = {
    onClose: () => void
}

export const CancelDowngradeModal = ({ onClose }: CancelDowngradeModalProps) => {
    const { subscription } = usePlanUsageInfo()
    const { mutateAsync, isLoading } = useActivatePlanMutation()

    const handleDowngradeCancelation = useCallback(async () => {
        if (!subscription?.plan) {
            onClose()
            return
        }

        await mutateAsync({
            apiHandle: subscription.plan.apiHandle,
            creditCard: subscription.creditCard || undefined,
        })

        onClose()
    }, [subscription])

    return (
        <Modal onClose={onClose} open>
            <Modal.Header title={locale.cancelDowngradeTitle} onClose={onClose} />
            <Modal.Body>
                <Typography>{locale.downgradeRequestText(subscription?.plan.name)}</Typography>
            </Modal.Body>
            <Modal.Actions>
                <LoadingButton onClick={onClose} loading={isLoading} variant="text">
                    {locale.backButton}
                </LoadingButton>
                <LoadingButton
                    onClick={handleDowngradeCancelation}
                    loading={isLoading}
                    variant="contained"
                    color="error"
                    data-testid="confirmDeleteChoice"
                >
                    {locale.confirmButton}
                </LoadingButton>
            </Modal.Actions>
        </Modal>
    )
}

export default CancelDowngradeModal
