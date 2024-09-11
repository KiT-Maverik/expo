import { locale } from 'locales'

export default {
    title: 'Are you sure you want to cancel account?',
    actions: {
        cancel: locale.operations.generic.cancel,
        confirm: locale.operations.generic.confirm,
    },
    notification: {
        cancel: locale.messages.entity.cancel.completed('Account'),
    },
}
