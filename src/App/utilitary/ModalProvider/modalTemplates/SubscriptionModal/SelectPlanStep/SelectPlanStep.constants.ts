import { ApiHandle, CustomerSubscriptionPlanTier, Plan, PlanName } from 'types/Customer'

export const MOCKED_PLAN: Plan = {
    id: 1,
    chargifyId: 1,
    apiHandle: ApiHandle.Free,
    name: PlanName.free,
    subtitle: null,
    features: ['Loading...', '...', '...', '...', '...'],
    price: '',
    trialPrice: '',
    creditCardRequired: false,
    setupFeeInCents: null,
    skipBillingPageAtSignup: false,
    hasTrial: false,
    isFree: false,
    isPublished: true,
    billingPeriod: '1 month',
    trialPeriod: null,
    bandwidth: 25,
    videoSpace: 3,
    encoding: 'standard',
    extraBandwidthPrice: 0,
    extraPlaysPrice: null,
    extraBandwidthUnit: 'GB',
    extraVideoSpacePrice: 1,
    tier: CustomerSubscriptionPlanTier.free,
    upsellPage: null,
    upsellMainProducts: null,
}

export const MOCKED_PLANS = Array.from({ length: 3 }, (_, i) => ({ ...MOCKED_PLAN, id: i }))
