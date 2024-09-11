import { locale } from 'locales'

const createClientForm = {
    header: 'Create New Client',
    message:
        "Fill out the name and email of the client account you'd like to add. If they have an account, they will be asked to link it to your Agency. If they don't, they'll be prompted to create a new one.",
    action: {
        cancel: locale.operations.generic.cancel,
        create: locale.operations.entity.create,
    },
    notification: {
        invitationSent: {
            label: 'Invitation sent',
            action: 'Copy invitation link',
        },
    },
    input: {
        name: {
            label: 'Name',
            placeholder: 'Type client name here',
            tooltip:
                "This Client Name is for your Agency's internal use. It will not display on your client's dashboard, and you can change it anytime you want.",
        },
        email: {
            label: 'Email',
            placeholder: 'Type client email here',
        },
    },
    contactUs: {
        needMoreInfo: 'Need more bandwidth for your clients?',
        getInTouch: 'Get in touch with us today',
        weTailor: "and we'll tailor a solution to fit your needs!",
    },
}

const choosePlanForm = {
    header: 'Select the best plan for your client!',
    action: {
        back: locale.operations.generic.back,
        sendInvitation: 'Send Invitation',
        startTrial: locale.operations.startTrial.fourteenDays,
    },
    contactUs: {
        needMoreInfo: 'Need more bandwidth for your clients?',
        getInTouch: 'Get in touch with us today',
        weTailor: "and we'll tailor a solution to fit your needs!",
    },
}

export default {
    createClientForm,
    choosePlanForm,
}
