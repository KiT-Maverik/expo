import { locale } from 'locales'

export default {
    title: 'Withdraw client invitation?',
    actions: {
        cancel: locale.operations.generic.cancel,
        revoke: locale.operations.generic.withdraw,
    },
    notification: {
        revoked: locale.messages.entity.withdraw.completed('Client invitation'),
    },
}
