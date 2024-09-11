import { useCallback, useState, useMemo } from 'react'
import classNames from 'classnames'
import { useIntercom } from 'react-use-intercom'
import { Box, Divider, Grid, Typography, Skeleton, Button, TypographyProps } from '@mui/material'

import CurrentPlanArrow from 'assets/img/freemium/arrows/current-plan-arrow.svg'
import useUserStatuses from 'hooks/user/useUserStatuses'
import useFeatureFlags from 'hooks/system/useFeatureFlags'
import { trackAppCuesEvent, APPCUES_EVENTS } from 'thirdPartyServices/appCues'
import { Plan as PlanInterface, CustomerSubscriptionPlanTier } from 'types/Customer'
import { getBillingPeriod } from 'utils/dates'
import { PlanStatus } from 'types/Auth'
import { useCustomerSubscriptionQuery, usePlansQuery } from 'api/queries'
import { PlanIndexByTier } from 'constants/plan.constants'

import { SetPlan } from '..'
import { ConfirmDowngrade } from '../ConfirmDowngrade'
import { MOCKED_PLANS } from './SelectPlanStep.constants'
import { Plan, PlanActions } from './Plan'
import { Feature } from './Feature'

import './index.scss'

type SelectPlanStepProps = {
    hideCurrentPlan?: boolean
    setPlan: SetPlan
    onClose: () => void
}

export const SelectPlanStep = ({ setPlan, onClose, hideCurrentPlan }: SelectPlanStepProps) => {
    const [downgradePlan, setDowngradePlan] = useState<PlanInterface | null>(null)
    const { data: subscription, isLoading: subLoading } = useCustomerSubscriptionQuery()
    const { planReactivation } = useFeatureFlags()
    const { data: plans, isLoading: plansLoading } = usePlansQuery()
    const { isUserInactive } = useUserStatuses()
    const { show, boot } = useIntercom()
    const pageLoading = subLoading || plansLoading
    const currentPlan = subscription?.plan || ({} as Partial<PlanInterface>)
    const titleProps: TypographyProps = hideCurrentPlan
        ? { textAlign: 'center', variant: 'h4', mb: 6 }
        : { variant: 'h2' }
    const handleContactUsClick = useCallback(() => {
        boot()
        show()
    }, [])

    const getPlanIndexByTier = useCallback((tier: CustomerSubscriptionPlanTier | undefined) => {
        return PlanIndexByTier[tier || CustomerSubscriptionPlanTier.unreachable]
    }, [])

    const currentPlanIndex = useMemo(
        () => getPlanIndexByTier(plans?.find((p) => p.id === currentPlan.id)?.tier),
        [currentPlan, plans, getPlanIndexByTier],
    )

    const handleReactivateClick = (plan: PlanInterface) => setPlan(plan, { reactivate: true })

    const renderReactivateBtn = (breakpoint: string) => {
        const userPlan = subscription?.plan

        if (!isUserInactive || !userPlan || !planReactivation || userPlan.status === PlanStatus.archive) {
            return
        }

        return (
            <Button
                className={classNames('reactivate', breakpoint)}
                variant="contained"
                onClick={() => {
                    trackAppCuesEvent(
                        `${APPCUES_EVENTS.PLANS_POPUP_PLAN_BTN_CLK} action - ${PlanActions.REACTIVATE}, plan.apiHandle - ${userPlan.apiHandle}`,
                    )
                    handleReactivateClick(userPlan)
                }}
            >
                Reactivate My Plan
            </Button>
        )
    }

    const renderHeader = () => {
        if (hideCurrentPlan) {
            return null
        }

        return (
            <>
                <Box className="head">
                    <Box className="header">
                        <Typography component="h4">Your Current Plan</Typography>
                        <img className="currentPlanArrow" width={24} height={22} src={CurrentPlanArrow} alt="Arrow" />
                        {renderReactivateBtn('md')}
                    </Box>

                    <Box className="currentPlanDetails">
                        <Box className="badge">
                            <Typography component="span">{subLoading ? 'Loading...' : currentPlan.name}</Typography>
                        </Box>
                        <Box className="price">
                            <Typography component="span">
                                {subLoading ? (
                                    <Skeleton width={50} />
                                ) : (
                                    <>
                                        <strong>${currentPlan.price}</strong> /{' '}
                                        {getBillingPeriod(currentPlan.billingPeriod)}
                                    </>
                                )}
                            </Typography>
                        </Box>

                        <Box
                            className={classNames('features', {
                                stretched: currentPlan.tier !== CustomerSubscriptionPlanTier.free,
                            })}
                        >
                            <Feature isLoading={subLoading}>
                                {currentPlan.bandwidth === 0 || currentPlan.bandwidth === -1 ? (
                                    'Unlimited GB'
                                ) : (
                                    <>
                                        {currentPlan.bandwidth}GB / {getBillingPeriod(currentPlan.billingPeriod)}
                                    </>
                                )}
                            </Feature>
                            <Feature isLoading={subLoading}>
                                {currentPlan.videoSpace === 0 || currentPlan.videoSpace === -1 ? (
                                    'Unlimited Storage'
                                ) : (
                                    <>{currentPlan.videoSpace} videos</>
                                )}
                            </Feature>
                            {currentPlan.tier !== CustomerSubscriptionPlanTier.free && (
                                <Feature isLoading={subLoading}>
                                    {currentPlan.extraBandwidthPrice} / Extra {currentPlan.extraBandwidthUnit}
                                </Feature>
                            )}
                        </Box>
                    </Box>
                </Box>

                {renderReactivateBtn('sm')}
            </>
        )
    }

    if (downgradePlan && subscription) {
        return (
            <ConfirmDowngrade
                plan={subscription.plan}
                downgradePlan={downgradePlan}
                onCancel={() => setDowngradePlan(null)}
                onClose={onClose}
            />
        )
    }

    return (
        <Box className="SelectPlanStep">
            {renderHeader()}

            <Typography className="plansTitle" {...titleProps}>
                Plans to suit your needs!
            </Typography>

            <Grid container spacing={2} className="plans">
                {(plans || MOCKED_PLANS)?.map((plan) => (
                    <Plan
                        key={plan.id}
                        plan={{ ...plan, index: getPlanIndexByTier(plan.tier) }}
                        currentPlan={{ ...currentPlan, index: currentPlanIndex }}
                        isLoading={pageLoading}
                        setUpgradePlan={setPlan}
                        onDowngrade={(plan) => setDowngradePlan(plan)}
                        onReactivate={handleReactivateClick}
                    />
                ))}
            </Grid>

            {currentPlan.tier !== CustomerSubscriptionPlanTier.enterprise && (
                <>
                    <Divider />
                    <Grid container spacing={2} className="enterprise">
                        <Grid item desktop={2} mobile={12}>
                            <Typography component="h3" className="enterpriseHeader">
                                Need even more?
                            </Typography>
                        </Grid>
                        <Grid item desktop={8} mobile={12}>
                            <Typography className="enterpriseText">
                                If you want even more bandwidth and video storage, you be in one of our Enterprise
                                plans. They include a full account audit and concierge service (we&apos;ll move your
                                videos for you for free!). Get in touch with us to learn more.
                            </Typography>
                        </Grid>
                        <Grid item desktop={2} mobile={12} className="enterpriseCtaContainer">
                            <Button onClick={handleContactUsClick} variant="contained">
                                Contact Us
                            </Button>
                        </Grid>
                    </Grid>
                </>
            )}
        </Box>
    )
}
