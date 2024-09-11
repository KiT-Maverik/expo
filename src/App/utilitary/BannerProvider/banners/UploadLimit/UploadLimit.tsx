import { Alert, AlertTitle, Button } from '@mui/material'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCustomerQuery, useCustomerSubscriptionQuery } from 'api/queries'
import { SubscriptionCtaSource } from 'design/templates/Modal'
import { UpgradeCTA } from 'design/atoms/UpgradeCTA'
import { OPEN_CREATE_CLIENT_MODAL } from 'design/pages/AgencyAccount/AgencyAccount'
import useAccountSubscription from 'hooks/user/useAccountSubscription'
import { CustomerStatus, CustomerSubscriptionPlanTier } from 'types/Customer'
import { route } from 'constants/routes'

import locale from './UploadLimit.locale'

export const UploadLimit = () => {
    const navigate = useNavigate()
    const { data: subscription } = useCustomerSubscriptionQuery()
    const { data: customer } = useCustomerQuery()
    const { isFree } = useAccountSubscription()

    const message = useMemo(() => {
        if (subscription?.plan?.tier === CustomerSubscriptionPlanTier.agency)
            return `${locale.message} ${locale.cta.createSubAccount}`

        if (isFree && customer && customer.status !== CustomerStatus.trial)
            return `${locale.message} ${locale.cta.startTrial}`

        return `${locale.message} ${locale.cta.upgrade}`
    }, [subscription?.plan?.tier, isFree, customer])

    const action = useMemo(() => {
        if (subscription?.plan?.tier === CustomerSubscriptionPlanTier.agency)
            return (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => navigate(route.agency.dashboard, { state: { [OPEN_CREATE_CLIENT_MODAL]: true } })}
                >
                    {locale.action.createNewAccount}
                </Button>
            )

        return <UpgradeCTA ctaSource={SubscriptionCtaSource.UPLOAD} renderIcon />
    }, [subscription?.plan?.tier])

    return (
        <Alert severity="error" variant="standard" isBanner action={action}>
            <AlertTitle>{locale.title}</AlertTitle>
            {message}
        </Alert>
    )
}
