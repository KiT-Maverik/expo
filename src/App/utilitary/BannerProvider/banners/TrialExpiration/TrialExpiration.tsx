import { Alert, AlertTitle, Button } from '@mui/material'
import { useMemo } from 'react'
import { useCustomerSubscriptionQuery } from 'api/queries'
import { useAppDispatch } from 'App'
import differenceInDays from 'date-fns/differenceInDays'
import { ModalType, openModal } from 'design/templates/Modal/ModalTypes/modal.slice'
import locale from './TrialExpiration.locale'

export const TrialExpiration = () => {
    const dispatch = useAppDispatch()
    const { data: subscription } = useCustomerSubscriptionQuery()

    const daysLeft = useMemo(
        () => differenceInDays(new Date(subscription?.dateNextBilling || ''), new Date(new Date().toDateString())),
        [subscription],
    )

    const message = useMemo(() => {
        let expiration = locale.expirationPeriod.manyDays(daysLeft)

        if (daysLeft === 0) expiration = locale.expirationPeriod.today
        else if (daysLeft === 1) expiration = locale.expirationPeriod.oneDay

        return locale.message(expiration)
    }, [daysLeft])

    return (
        <Alert
            severity="warning"
            variant="standard"
            isBanner
            action={
                <Button
                    variant="contained"
                    color="warning"
                    onClick={() => dispatch(openModal({ type: ModalType.PAYMENT_METHOD }))}
                >
                    {locale.action.addPaymentMethod}
                </Button>
            }
        >
            <AlertTitle>{locale.title}</AlertTitle>
            {message}
        </Alert>
    )
}
