import { useState, useMemo, useRef, useEffect } from 'react'
import { Formik } from 'formik'
import { useToast } from 'design/organisms/ToastProvider'
import { useAppDispatch } from 'App'
import { Box, Typography, Grid, Button, Divider, Skeleton, IconButton } from '@mui/material'

import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import { Features } from 'design/templates/Modal/modalTemplates/SubscriptionModal/SelectPlanStep/Plan/Features'
import SuccessCheckmarkGreen from 'assets/img/freemium/checkmarks/success-checkmark-green.svg'
import LightningStrike from 'assets/img/freemium/lightning-strike.svg'
import { cardFormValidationSchema } from 'design/pages/SignUp/Forms'
import { INITIAL_VALUES } from 'design/pages/SignUp/constants'
import { ApiHandle, CustomerSubscriptionPlanTier, Plan } from 'types/Customer'
import { convertCentsToDollars, getBillingPeriod, stringPriceToNumber } from 'utils'
import {
    useCustomerSubscriptionQuery,
    usePlanProrateQuery,
    usePlanQuery,
    usePlansQuery,
    useRefreshTokenQuery,
} from 'api/queries'
import { useActivatePlanMutation } from 'api/mutations'
import { setTokenRefreshing } from 'design/pages/AccountSettings/account.slice'
import { useChagifyTokenStatus } from 'hooks/chargify.hooks'

import { SetPlan } from '..'
import { SuccessMessage } from '../SuccessMessage'
import { PlanOptions } from '../subscription.slice'
import locale from './ActivationStep.locale'
import { ChargifyForm } from './ChargifyForm'

import './index.scss'

type ActivationStepProps = {
    selectedPlan?: Plan
    lookForTier?: CustomerSubscriptionPlanTier
    lookForApiHandle?: ApiHandle
    planOptions?: PlanOptions
    hideBreadcrumb?: boolean
    setPlan: SetPlan
    onClose: () => void
}

export const ActivationStep = ({
    selectedPlan,
    lookForTier,
    lookForApiHandle,
    planOptions,
    hideBreadcrumb,
    setPlan,
    onClose,
}: ActivationStepProps) => {
    const dispatch = useAppDispatch()
    const { data: subscription, isLoading } = useCustomerSubscriptionQuery()
    const { data: plans } = usePlansQuery()
    const { showToast } = useToast()
    const { data: planByApiHandle } = usePlanQuery(lookForApiHandle as string, {
        enabled: Boolean(lookForApiHandle),
        onError: () => {
            showToast({
                message: locale.error.failedLoadPlan,
                type: 'error',
            })
            onClose()
        },
    })

    const { refetch: refreshToken } = useRefreshTokenQuery()

    const { chargifyTokenError, chargifyTokenSuccess } = useChagifyTokenStatus()

    const chargify = useRef(window.Chargify ? new window.Chargify() : null)
    const formRef = useRef(null)
    const [openForm, setOpenForm] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [reactivationSuccess, setReactivationSuccess] = useState(false)
    const activatePlanMutation = useActivatePlanMutation({
        onSuccess: async () => {
            await refreshToken()

            return planOptions?.reactivate ? setReactivationSuccess(true) : setShowSuccessMessage(true)
        },
    })

    useEffect(() => {
        return () => {
            dispatch(setTokenRefreshing({ isTokenRefreshing: false }))
        }
    }, [])

    const plan = useMemo(() => {
        if (lookForApiHandle) {
            return planByApiHandle
        }

        if (selectedPlan || !plans?.length) {
            return selectedPlan
        }

        return plans.find((p) =>
            lookForTier
                ? p.tier === lookForTier
                : p.tier === CustomerSubscriptionPlanTier.proIv || p.tier === CustomerSubscriptionPlanTier.pro,
        )
    }, [selectedPlan, lookForApiHandle, planByApiHandle, plans])

    const { data: planProrate, isLoading: isPlanProrateLoading } = usePlanProrateQuery(plan?.apiHandle)

    const openCardForm = isLoading ? false : Boolean(openForm || !subscription?.creditCard?.cardNumber)

    const renderAvailableCard = () => {
        if (openCardForm || !subscription) {
            return null
        }

        const expYear = subscription.creditCard?.expirationYear.toString()

        return (
            <Box className="customerCreditCard" data-testid="customerCreditCard">
                <Box className="detailsContainer">
                    <img src={SuccessCheckmarkGreen} alt="success checkmark icon" />

                    <Box className="details">
                        <Typography className="bullets" component="span">
                            &#8226; &#8226; &#8226; &#8226;
                        </Typography>
                        <Typography className="cardNumbers" component="span">
                            {subscription.creditCard?.cardNumber.substring(15)}
                        </Typography>
                        <Typography className="expiration">
                            Exp.{subscription.creditCard?.expirationMonth}/
                            {expYear && expYear.length > 2 ? expYear.substring(2) : expYear}
                        </Typography>

                        <Button variant="outlined" onClick={() => setOpenForm(true)}>
                            Change Payment Method
                        </Button>
                    </Box>
                </Box>

                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="remove card"
                    className="trash"
                    onClick={() => setOpenForm(true)}
                >
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            </Box>
        )
    }

    const renderCost = () => {
        if (isPlanProrateLoading || !plan) {
            return (
                <Box className="planPriceBlock">
                    <Skeleton width={60} />
                    <Skeleton width={80} />
                </Box>
            )
        }

        const paymentDueInCents = planProrate?.migration.payment_due_in_cents || 0
        const fullPrice = stringPriceToNumber(plan.price)

        if (
            planProrate &&
            (paymentDueInCents > 0 ? paymentDueInCents / 100 !== fullPrice : paymentDueInCents !== fullPrice)
        ) {
            return (
                <Box>
                    <Box className="planPriceBlock upgradePrice">
                        <Typography component="h3" variant="h3" className="total">
                            Today You Pay
                        </Typography>
                        <Typography component="h3" variant="h3" className="planPrice">
                            {convertCentsToDollars(paymentDueInCents)}
                        </Typography>
                    </Box>
                    <Box className="planPriceBlock fullPrice">
                        <Typography component="h3" variant="h3" className="total">
                            Plan Total:
                        </Typography>
                        <Typography component="h3" variant="h3" className="planPrice">
                            <span className="crossed">
                                ${plan ? fullPrice.toFixed(2) : <Skeleton width={24} variant="text" />}
                            </span>
                            <Typography component="span" className="period">
                                / {getBillingPeriod(plan.billingPeriod)}
                            </Typography>
                        </Typography>
                    </Box>
                </Box>
            )
        }

        return (
            <Box className="planPriceBlock">
                <Typography component="h3" variant="h3" className="total">
                    Total:
                </Typography>
                <Typography component="h3" variant="h3" className="planPrice">
                    ${plan ? fullPrice.toFixed(2) : <Skeleton width={24} variant="text" />}
                    <Typography component="span" className="period">
                        / {getBillingPeriod(plan.billingPeriod)}
                    </Typography>
                </Typography>
            </Box>
        )
    }
    const handleTrialActivation = async () => {
        if (!plan) {
            return
        }

        const apiHandle = planOptions?.reactivate ? subscription?.plan.apiHandle : plan.apiHandle
        const pricePoint = subscription?.pricePoint
        const addons = planOptions?.addons

        if (!apiHandle) {
            return
        }

        if (openCardForm) {
            chargify.current?.token(
                formRef.current,

                chargifyTokenSuccess((token) => {
                    dispatch(setTokenRefreshing({ isTokenRefreshing: true }))
                    activatePlanMutation.mutateAsync({
                        apiHandle,
                        creditCardToken: token,
                        pricePoint,
                        addons,
                    })
                }),
                chargifyTokenError,
            )
        } else {
            activatePlanMutation.mutateAsync({ apiHandle, pricePoint, addons })
        }
    }

    if (reactivationSuccess) {
        return (
            <SuccessMessage
                mainTitle="Reactivation Success!"
                title="Reactivation"
                description="You have successfully reactivated your account!"
                onClose={onClose}
            />
        )
    }

    if (showSuccessMessage) {
        return (
            <SuccessMessage
                mainTitle="You have been successfully upgraded!"
                title="Check Out Your New Perks"
                description="Now that you have decided to up your video marketing game, make sure to check out the best features to
        enable to make sure your videos perform their best."
                onClose={onClose}
            />
        )
    }

    return (
        <Box className="ActivationStep">
            <Box className="header">
                {!hideBreadcrumb && (
                    <Typography className="actionBack" onClick={() => setPlan(undefined)}>
                        <ArrowBackIosNewOutlinedIcon />
                        Choose a different plan
                    </Typography>
                )}
            </Box>

            <Grid container spacing={2}>
                <Grid item laptop={5} mobile={12} className="plan">
                    <Typography className="text">Upgrade</Typography>
                    <Typography className="planName">
                        {!plan?.isFree && <img width={26} src={LightningStrike} alt="lightning icon" />}{' '}
                        {plan?.name || <Skeleton width={100} height={36} />}
                    </Typography>
                    <Features plan={plan} />
                </Grid>

                <Grid item laptop={7} mobile={12}>
                    <Formik
                        initialValues={INITIAL_VALUES}
                        validationSchema={cardFormValidationSchema}
                        /* eslint-disable  @typescript-eslint/no-empty-function */
                        onSubmit={() => {}}
                    >
                        {() => (
                            <Box className="paymentDetails">
                                <Typography component="h2">Payment Details</Typography>

                                {renderAvailableCard()}

                                {openCardForm && <ChargifyForm chargify={chargify} formRef={formRef} />}

                                <Divider />

                                {renderCost()}

                                {(planProrate?.migration.hasTrial || subscription?.plan.isFree) && (
                                    <Typography className="trialNotice">
                                        *Your trial will be effective today, and billed in 14 days, and every month
                                        after that, until you cancel your subscription.
                                    </Typography>
                                )}

                                <Button
                                    variant="contained"
                                    className="activateCta"
                                    onClick={handleTrialActivation}
                                    disabled={!plan}
                                    data-testid="activatePlanCta"
                                >
                                    {planProrate?.migration.hasTrial ? 'Activate your trial' : 'Activate Your Plan'}
                                </Button>
                            </Box>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </Box>
    )
}
