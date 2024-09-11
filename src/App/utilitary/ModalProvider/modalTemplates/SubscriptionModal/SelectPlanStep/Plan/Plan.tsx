import { Box, Button, Grid, Typography, Skeleton } from '@mui/material'
import mixpanel from 'mixpanel-browser'

import LightningStrike from 'assets/img/freemium/lightning-strike.svg'
import useUserStatuses from 'hooks/user/useUserStatuses'
import { trackAppCuesEvent, APPCUES_EVENTS } from 'thirdPartyServices/appCues'
import { Plan as PlanInterface, CustomerSubscriptionPlanTier, PlanName, BillingMode } from 'types/Customer'
import { UpgradeCTA } from 'design/atoms/UpgradeCTA/UpgradeCTA'
import { SetPlan } from 'design/templates/Modal'
import { MIXPANEL_EVENTS } from 'thirdPartyServices/mixpanel'
import { Features } from './Features'

interface PlanIndexedInterface extends PlanInterface {
    index: number
}

interface CurrentPlanIndexedInterface extends Partial<PlanInterface> {
    index: number
}

type PlanProps = {
    plan: PlanIndexedInterface
    isLoading: boolean
    currentPlan: CurrentPlanIndexedInterface
    setUpgradePlan: SetPlan
    onDowngrade: (plan: PlanInterface) => void
    onReactivate: (plan: PlanInterface) => void
}

export enum PlanActions {
    UPGRADE = 'UPGRADE',
    REACTIVATE = 'REACTIVATE',
    DOWNGRADE = 'DOWNGRADE',
}

export const Plan = ({ plan, isLoading, currentPlan, setUpgradePlan, onDowngrade, onReactivate }: PlanProps) => {
    const { isUserInactive } = useUserStatuses()

    const isBandWidthMode = currentPlan?.billingMode === BillingMode.bandWidth
    const isPlayMode = currentPlan?.billingMode === BillingMode.play
    const isUserOnFreePlan = currentPlan.name === PlanName.free
    const isUserOnEnterprisePlan = currentPlan.tier === CustomerSubscriptionPlanTier.enterprise
    const isUserOnProIvPlan = currentPlan.tier === CustomerSubscriptionPlanTier.proIv

    const trackPlanBtnClick = (action: PlanActions) => {
        trackAppCuesEvent(
            `${APPCUES_EVENTS.PLANS_POPUP_PLAN_BTN_CLK} action - ${action}, plan.apiHandle - ${plan.apiHandle}`,
        )
        mixpanel.track(MIXPANEL_EVENTS.SUBSCRIPTIONS_PLAN_SELECTED, {
            old_plan: currentPlan.apiHandle || null,
            new_plan: plan.apiHandle,
        })
    }

    const handleUpgradeBtnClick = () => {
        setUpgradePlan(plan)
        trackPlanBtnClick(PlanActions.UPGRADE)
    }

    const handleReactivation = () => {
        onReactivate(plan)
        trackPlanBtnClick(PlanActions.REACTIVATE)
    }

    const handleDowngrade = () => {
        onDowngrade(plan)
        trackPlanBtnClick(PlanActions.DOWNGRADE)
    }

    return (
        <Grid item desktop={4} mobile={12} className="plan">
            <Box className="planCard">
                <Typography className="planName">
                    {isLoading ? (
                        <Skeleton width={50} />
                    ) : (
                        <>
                            {!plan.isFree && <img width={16} src={LightningStrike} />} {plan.name}
                        </>
                    )}
                </Typography>
                <Box>
                    {isLoading ? (
                        <Skeleton width={100} height={50} />
                    ) : (
                        <>
                            <Typography className="planPrice" component="span">
                                ${Number(plan.price)}
                            </Typography>
                            <Typography className="planPeriod" component="span">
                                / month
                            </Typography>
                        </>
                    )}
                </Box>
                {isLoading && (
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={40}
                        className="cta"
                        data-testid="ctaSkeleton"
                    />
                )}

                {!isLoading && plan.name === currentPlan.name && (
                    <Button
                        variant="contained"
                        className="planCurrent cta"
                        disabled={!isUserInactive}
                        onClick={handleReactivation}
                        fullWidth
                    >
                        {isUserInactive ? 'Reactivate' : 'Your current plan'}
                    </Button>
                )}

                {!isLoading && isBandWidthMode && (
                    <>
                        {(((plan.name === PlanName.pro || plan.tier === CustomerSubscriptionPlanTier.proIv) &&
                            isUserOnFreePlan) ||
                            (plan.tier === CustomerSubscriptionPlanTier.proIv &&
                                !isUserOnProIvPlan &&
                                !isUserOnEnterprisePlan) ||
                            (plan.name === PlanName.premium && !isUserOnEnterprisePlan)) && (
                            <UpgradeCTA onClick={handleUpgradeBtnClick} dataTestid={plan.name} renderIcon fullWidth />
                        )}

                        {((!isUserOnFreePlan && plan.name === PlanName.free) ||
                            (isUserOnEnterprisePlan &&
                                (plan.name === PlanName.pro || plan.tier === CustomerSubscriptionPlanTier.proIv)) ||
                            (isUserOnEnterprisePlan &&
                                plan.name === PlanName.premium &&
                                currentPlan.name !== PlanName.premium) ||
                            (isUserOnProIvPlan && plan.name === PlanName.pro)) && (
                            <Button
                                variant="outlined"
                                className="planDowngrade cta"
                                onClick={handleDowngrade}
                                fullWidth
                            >
                                Downgrade to {plan.name}
                            </Button>
                        )}
                    </>
                )}

                {!isLoading && isPlayMode && plan.index < currentPlan.index && (
                    <Button variant="outlined" className="planDowngrade cta" onClick={handleDowngrade} fullWidth>
                        Downgrade to {plan.name}
                    </Button>
                )}

                {!isLoading && isPlayMode && plan.index > currentPlan.index && (
                    <UpgradeCTA onClick={handleUpgradeBtnClick} dataTestid={plan.name} renderIcon fullWidth />
                )}

                <Features plan={plan} />
            </Box>
        </Grid>
    )
}
