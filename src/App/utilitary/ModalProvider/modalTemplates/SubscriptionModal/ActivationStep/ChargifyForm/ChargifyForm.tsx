import { useEffect, MutableRefObject } from 'react'

import ChargifyCreditCardForm from 'design/molecules/ChargifyCreditCardForm'
import { CHARGIFY_PUBLIC_KEY, CHARGIFY_SERVER_HOST } from 'App'

import './index.scss'

type ChargifyFormProps = {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    chargify: MutableRefObject<any>
    formRef: MutableRefObject<null>
}

export const ChargifyForm = ({ chargify, formRef }: ChargifyFormProps) => {
    useEffect(() => {
        chargify.current?.load({
            selector: '#chargify-form',
            publicKey: CHARGIFY_PUBLIC_KEY,
            type: 'card',
            serverHost: CHARGIFY_SERVER_HOST,
            hideCardImage: false,
            optionalLabel: '',
            requiredLabel: '',
            addressDropdowns: true,
            style: {
                field: {
                    overflow: 'hidden',
                    margin: 0,
                },
                input: {
                    color: 'rgba(0, 0, 0, 0.87)',
                    placeholder: { color: 'rgba(0, 0, 0, 0.42)' },
                },
                label: {
                    fontSize: '14px',
                    fontFamily: 'open-sans-semibold,sans-serif',
                    margin: 0,
                },
                message: {
                    color: '#d80027',
                    height: '16px',
                },
            },
            fields: {
                firstName: {
                    selector: '#chargify-firstname',
                    label: 'First Name',
                    placeholder: 'Type your name',
                    required: true,
                    message: 'Please enter a valid first name',
                    maxlength: '30',
                },
                lastName: {
                    selector: '#chargify-lastname',
                    label: 'Last Name',
                    placeholder: 'Type your last name',
                    required: true,
                    message: 'Please enter a valid last name',
                    maxlength: '30',
                },
                number: {
                    selector: '#chargify-card',
                    label: 'Card number',
                    placeholder: '**** **** **** ****',
                    message: 'Please enter a valid card number',
                },
                month: {
                    selector: '#chargify-month',
                    label: 'Month',
                    placeholder: 'mm',
                    message: ' ',
                },
                year: {
                    selector: '#chargify-year',
                    label: 'Year',
                    placeholder: 'yyyy',
                    message: ' ',
                },
                cvv: {
                    selector: '#chargify-cvv',
                    label: 'CVV',
                    placeholder: '***',
                    required: true,
                    message: ' ',
                },
                zip: {
                    selector: '#chargify-zip',
                    label: 'Zip Code',
                    placeholder: '#####',
                    required: true,
                    message: 'Please enter a valid zip code',
                    maxlength: '7',
                },
            },
        })

        return () => {
            chargify.current?.unload()
        }
    }, [])

    return (
        <form ref={formRef} id="chargify-form">
            <ChargifyCreditCardForm />
        </form>
    )
}
