import { locale } from 'locales'

export default {
    title: 'Are you sure you want to resend the cancellation email to the client?',
    actions: {
        cancel: locale.operations.generic.cancel,
        resend: locale.operations.generic.resend,
    },
    notification: {
        sent: locale.messages.entity.send.completed('Cancellation email'),
    },
}
