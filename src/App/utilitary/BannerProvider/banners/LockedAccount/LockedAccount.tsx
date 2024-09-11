import { Alert, AlertTitle, Button, Skeleton } from '@mui/material'
import { Link } from 'design/atoms/Link'
import { useEffect, useMemo } from 'react'
import { PlanStatus } from 'types/Auth'
import { useCustomerSubscriptionQuery } from 'api/queries'
import useLogout from 'hooks/user/useLogout'
import { useIntercom } from 'react-use-intercom'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

import { closeModal, ModalType, openModal } from 'design/templates/Modal/ModalTypes/modal.slice'
import { closeSubscriptionModal, openSubscriptionModal, SubscriptionCtaSource } from 'design/templates/Modal'
import { useAppDispatch } from 'App'
import { route } from 'constants/routes'
import locale from './LockedAccount.locale'

export const LockedAccount = () => {
    const logout = useLogout()
    const { show, boot } = useIntercom()
    const dispatch = useAppDispatch()

    const { data: subscription, isLoading } = useCustomerSubscriptionQuery()

    const closeModalWindow = () => {
        dispatch(closeModal())
        dispatch(closeSubscriptionModal())
    }

    useEffect(() => closeModalWindow, [])

    useEffect(() => {
        if (!subscription) {
            return
        }

        if (subscription.transition?.require && subscription.transition.apiHandle) {
            dispatch(openModal({ type: ModalType.PAYMENT_METHOD, planTransition: true }))
            return
        }

        dispatch(openSubscriptionModal({ ctaSource: SubscriptionCtaSource.LOCKED_ACCOUNT }))
    }, [subscription])

    const handleContactSupportClick = () => {
        boot()
        show()
        // open intercom causes scroll down what is undesirable
        setTimeout(() => window.scrollTo(0, 0), 0)
    }

    const title = useMemo(() => {
        if (isLoading) return <Skeleton variant="text" />

        return subscription?.plan.status === PlanStatus.archive ? locale.title.planExpired : locale.title.billPastDue
    }, [subscription, isLoading])

    const message = useMemo(() => {
        if (isLoading) return <Skeleton variant="text" />

        return subscription?.plan.status === PlanStatus.archive
            ? `${locale.message} ${locale.cta.chooseNewPlan}`
            : `${locale.message} ${locale.cta.updateBillingInfo}`
    }, [subscription, isLoading])

    const supportLink = useMemo(
        () => (
            <>
                {' '}
                Need help?{' '}
                <Link
                    to={route.placeholder}
                    onClick={handleContactSupportClick}
                    sx={{ color: (theme) => `${theme.palette.primary.main} !important` }}
                >
                    Contact support
                </Link>
            </>
        ),
        [handleContactSupportClick],
    )

    return (
        <Alert
            severity="error"
            isBanner
            variant="standard"
            action={
                <>
                    <Link to={route.settings.account.index} onClick={closeModalWindow}>
                        <Button color="tertiary" variant="outlined" startIcon={<SettingsRoundedIcon />}>
                            {locale.action.settings}
                        </Button>
                    </Link>
                    <Button color="tertiary" variant="text" startIcon={<LogoutRoundedIcon />} onClick={logout}>
                        {locale.action.signOut}
                    </Button>
                </>
            }
        >
            <AlertTitle>{title}</AlertTitle>
            {message}
            {supportLink}
        </Alert>
    )
}
