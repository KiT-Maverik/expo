import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { CustomerSubscriptionPlanTier, ApiHandle, Plan, ActivateCustomerPlanPayload } from 'types/Customer'
import { type RootState } from 'App'

export enum SubscriptionSteps {
    ACTIVATION_STEP = 'ACTIVATION_STEP',
    SELECT_PLAN_STEP = 'SELECT_PLAN_STEP',
}

export enum SubscriptionCtaSource {
    HEADER = 'header',
    DASHBOARD = 'dashboard',
    UPLOAD = 'upload',
    STATS = 'stats',
    CONVERSIONS = 'conversions',
    INTEGRATIONS = 'integrations',
    SMART_VIDS = 'smart_vids',
    USER_SETTINGS = 'user_settings',
    ACCOUNT_SETTINGS = 'account_settings',
    LOCKED_ACCOUNT = 'locked_account',
    VID_SETTINGS = 'vid_settings',
    VID_CONDITIONS = 'vid_conditions',
    UPSELL_BANNER = 'upsell_banner',
}

export interface PlanOptions {
    reactivate?: boolean
    addons?: ActivateCustomerPlanPayload['addons']
}

interface SubscriptionState {
    open: boolean
    step: SubscriptionSteps
    ctaSource?: SubscriptionCtaSource
    plan?: Plan
    lookForTier?: CustomerSubscriptionPlanTier
    lookForApiHandle?: ApiHandle
    planOptions?: PlanOptions
    lockClose?: boolean
    hideBreadcrumb?: boolean
    hideCurrentPlan?: boolean
    containerRef?: HTMLElement
    onClose?(): void
}

interface SubscriptionPayload
    extends Pick<
        SubscriptionState,
        'hideBreadcrumb' | 'hideCurrentPlan' | 'lookForTier' | 'lookForApiHandle' | 'containerRef'
    > {
    step?: SubscriptionState['step']
    ctaSource?: SubscriptionState['ctaSource']
    onClose?(): void
}

const initialState: SubscriptionState = {
    open: false,
    step: SubscriptionSteps.SELECT_PLAN_STEP,
}

export const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        openSubscriptionModal: (state, action: PayloadAction<SubscriptionPayload | undefined>) => {
            const newState = state as SubscriptionState

            newState.open = true
            newState.lookForTier = action.payload?.lookForTier
            newState.lookForApiHandle = action.payload?.lookForApiHandle
            newState.containerRef = action.payload?.containerRef
            newState.hideBreadcrumb = action.payload?.hideBreadcrumb
            newState.hideCurrentPlan = action.payload?.hideCurrentPlan
            newState.ctaSource = action.payload?.ctaSource
            newState.onClose = action.payload?.onClose

            if (action.payload?.step) {
                newState.step = action.payload.step
            }
        },
        closeSubscriptionModal: () => initialState,
        setPlan: (state, action: PayloadAction<{ plan?: Plan; options?: PlanOptions }>) => {
            state.plan = action.payload.plan
            state.planOptions = action.payload.options

            state.step = action.payload.plan ? SubscriptionSteps.ACTIVATION_STEP : SubscriptionSteps.SELECT_PLAN_STEP
        },
    },
})

export const { openSubscriptionModal, closeSubscriptionModal, setPlan } = subscriptionSlice.actions

export const selectSubscription = (state: RootState) => state.subscription
export const selectOpen = (state: RootState) => state.subscription.open

export const subscription = subscriptionSlice.reducer
