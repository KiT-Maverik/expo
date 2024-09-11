import { locale } from 'locales'

export default {
    title: 'Unlink agency',
    message: 'Are you sure you want to revoke agency access? This action will unlink the agency from your account.',
    actions: {
        cancel: locale.operations.generic.cancel,
        resend: locale.operations.generic.revoke,
    },
    notification: {
        accessRevoked: {
            title: locale.messages.entity.revoke.completed('Agency Access'),
            message: (agencyName: string) => `${agencyName} has been successfully unlinked from your account.`,
        },
    },
}
