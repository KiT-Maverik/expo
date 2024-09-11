import { locale } from 'locales'

export default {
    title: 'Edit client',
    avatarTitle: (hasPicture: boolean) =>
        `${hasPicture ? locale.operations.entity.edit : locale.operations.entity.add} Client Logo / Picture`,
    hint: (name: string) =>
        `You are about to edit the name of “${name}”. This will only change the name in your dashboard and not in the Client’s account.`,
    notification: {
        clientUpdated: locale.messages.entity.update.completed('Client'),
        avatarUpdated: locale.messages.entity.update.completed('Avatar'),
        error: locale.messages.errors.generic,
    },
    action: {
        cancel: locale.operations.generic.cancel,
        confirm: locale.operations.generic.confirm,
    },
}
