import { locale } from 'locales'

export default {
    title: 'Are you sure you want to resend the invitation to the client?',
    actions: {
        cancel: locale.operations.generic.cancel,
        resend: locale.operations.generic.resend,
    },
    notification: {
        sent: locale.messages.entity.send.completed('Invitation'),
        error: locale.messages.errors.generic,
    },
}
