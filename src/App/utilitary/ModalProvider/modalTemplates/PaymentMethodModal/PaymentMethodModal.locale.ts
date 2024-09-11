import { locale } from 'locales'

export default {
    title: 'Payment Method',
    input: {
        creditCard: {
            number: locale.inputs.creditCard.number,
            cvv: {
                ...locale.inputs.creditCard.cvv,
                tooltip:
                    'The card security code is the three digit code on the back of your Visa or Mastercard. For\n' +
                    '                        American Express card holders, it is a four digit number on the front of the credit card.',
            },
            month: locale.inputs.creditCard.expiry.month,
            year: locale.inputs.creditCard.expiry.year,
        },
        user: {
            firstName: locale.inputs.user.firstName,
            lastName: locale.inputs.user.lastName,
            zip: locale.inputs.address.zip,
        },
    },
    save: locale.operations.generic.save,
}
