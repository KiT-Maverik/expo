import { useEffect, useState, useRef } from 'react'
import { Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import classNames from 'classnames'
import mixpanel from 'mixpanel-browser'

import { Modal } from 'design/templates/Modal'
import useUserStatuses from 'hooks/user/useUserStatuses'
import { useLayout } from 'hooks/utilities/useLayout'
import { Plan } from 'types/Customer'
import { useAppSelector, useAppDispatch } from 'App'
import { MIXPANEL_EVENTS } from 'thirdPartyServices/mixpanel'
import {
    selectSubscription,
    closeSubscriptionModal,
    setPlan,
    SubscriptionSteps,
    PlanOptions,
} from './subscription.slice'
import { SelectPlanStep } from './SelectPlanStep'
import { ActivationStep } from './ActivationStep'
import style from './SubscriptionModal.style'

import './index.scss'

export type SetPlan = (plan?: Plan, options?: PlanOptions) => void

export const SubscriptionModal = () => {
    const { isMobile } = useLayout()
    const [disabledExitAnimation, setDisabledExitAnimation] = useState(false)
    const subscription = useAppSelector(selectSubscription)
    const { isUserInactive } = useUserStatuses()
    const dispatch = useAppDispatch()
    const isSubscriptionOpenTriggeredRef = useRef(false)

    const handleClose = () => {
        isSubscriptionOpenTriggeredRef.current = false
        dispatch(closeSubscriptionModal())
        subscription.onClose?.()
    }

    useEffect(() => {
        if (!subscription.open) return
        if (isSubscriptionOpenTriggeredRef.current) return
        mixpanel.track(MIXPANEL_EVENTS.SUBSCRIPTIONS_OPENED, { cta_source: subscription.ctaSource || null })
        isSubscriptionOpenTriggeredRef.current = true
    }, [subscription])

    const setSelectedPlan: SetPlan = (plan, options) => dispatch(setPlan({ plan, options }))

    return (
        <Modal
            open={subscription.open}
            onClose={handleClose}
            className={classNames('Subscription', {
                isUserInactive,
                disabledExitAnimation,
                hasParent: Boolean(subscription.containerRef),
            })}
            container={isMobile ? undefined : subscription.containerRef}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            stackProps={{ sx: style.modalStack }}
            width="lg"
        >
            <Modal.Header sx={style.header}>
                <Box display="flex" justifyContent="end" flexGrow="1">
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Modal.Header>
            <Modal.Body>
                <Box className="container" onAnimationEnd={() => setDisabledExitAnimation(false)}>
                    <Box className="body">
                        {subscription.step === SubscriptionSteps.ACTIVATION_STEP || subscription.plan ? (
                            <ActivationStep
                                selectedPlan={subscription.plan}
                                lookForApiHandle={subscription.lookForApiHandle}
                                lookForTier={subscription.lookForTier}
                                hideBreadcrumb={subscription.hideBreadcrumb}
                                planOptions={subscription.planOptions}
                                setPlan={setSelectedPlan}
                                onClose={handleClose}
                            />
                        ) : (
                            <SelectPlanStep
                                setPlan={setSelectedPlan}
                                onClose={handleClose}
                                hideCurrentPlan={subscription.hideCurrentPlan}
                            />
                        )}
                    </Box>
                </Box>
            </Modal.Body>
        </Modal>
    )
}
