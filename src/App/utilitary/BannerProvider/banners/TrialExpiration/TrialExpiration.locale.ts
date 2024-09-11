import { locale } from 'locales'

export default {
    title: 'Trial will expire soon',
    action: {
        addPaymentMethod: locale.operations.generic.addPaymentMethod,
    },
    expirationPeriod: {
        today: 'It will expire today.',
        oneDay: 'It will expire in 1 day.',
        manyDays: (days: number) => `It will expire in ${days} days.`,
    },
    message: (expiration: string) =>
        `Your current plan is Premium Trial. ${expiration} To keep your account and videos running, add a payment method now.`,
}
