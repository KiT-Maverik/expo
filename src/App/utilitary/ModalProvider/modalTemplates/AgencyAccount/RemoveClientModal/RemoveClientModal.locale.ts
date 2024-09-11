import { locale } from 'locales'

export default {
    title: 'Are you sure you want to remove client?',
    actions: {
        cancel: locale.operations.generic.cancel,
        confirm: locale.operations.generic.confirm,
    },
    notification: {
        cancelAccount: {
            title: 'Cancellation initiated',
            message: 'Instructions emailed to client, awaiting their confirmation to finalize.',
        },
        removeAccount: {
            title: 'Account removed',
            message:
                "The client's account has been removed.\nYou can resend the invitation if they wish to reactivate it in the future.",
        },
        error: locale.messages.errors.generic,
    },
    hint: {
        cancel: 'Initiates the process to completely cancel this Vidalytics account. The account owner will receive an email to confirm cancellation. If confirmed, further steps will be communicated via Intercom chat.',
        remove: 'This option detaches the client from your agency dashboard without affecting their Vidalytics account. The client retains full access to their account, which will no longer appear under your management.',
    },
}
