import { Box } from '@mui/material'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { useAppSelector } from 'App'
import { useCustomerQuery, useCustomerSubscriptionQuery } from 'api/queries'
import { ActingAs, LockedAccount, TrialExpiration, UploadLimit } from 'design/organisms/BannerProvider'
import { selectAccount } from 'design/pages/AccountSettings/account.slice'
import useIsLockedAccount from 'hooks/user/useIsLockedAccount'
import { CustomerStatus } from 'types/Customer'
import { useUploadLimit } from 'hooks/user/useUploadLimit.hook'
import { route } from 'constants/routes'

export const BannerProvider = () => {
    const { isAgency } = useAppSelector(selectAccount)
    const { pathname } = useLocation()

    const { data: customer } = useCustomerQuery()
    const { data: subscription } = useCustomerSubscriptionQuery()
    const isLockedAccount = useIsLockedAccount()
    const { uploadLimitReached } = useUploadLimit(false)

    const showTrialExpirationBanner = useMemo(
        () =>
            customer?.status === CustomerStatus.trial &&
            !subscription?.creditCard &&
            pathname === route.settings.account.index,
        [pathname, subscription?.creditCard, customer?.status],
    )

    const enableUploadLimitBanner = useMemo(
        () => uploadLimitReached && pathname === route.upload && isAgency,
        [isAgency, uploadLimitReached, pathname],
    )

    const content = useMemo(() => {
        const result = []

        if (isLockedAccount) result.push(<LockedAccount key="locked account" />)
        if (enableUploadLimitBanner) result.push(<UploadLimit key="upload limit" />)
        if (showTrialExpirationBanner) result.push(<TrialExpiration key="trial expiration" />)
        if (isAgency && pathname !== route.agency.dashboard) result.push(<ActingAs key="acting as client" />)

        return result
    }, [showTrialExpirationBanner, isLockedAccount, isAgency, pathname, enableUploadLimitBanner])

    if (content.length === 0) return null

    return <Box>{content}</Box>
}
