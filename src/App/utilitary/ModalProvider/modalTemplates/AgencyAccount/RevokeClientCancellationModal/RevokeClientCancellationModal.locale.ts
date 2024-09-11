import { locale } from 'locales'

export default {
    title: 'Revoke client account cancellation?',
    actions: {
        cancel: locale.operations.generic.cancel,
        revoke: locale.operations.generic.revoke,
    },
    notification: {
        revoked: locale.messages.entity.revoke.completed('Account cancellation'),
    },
}
