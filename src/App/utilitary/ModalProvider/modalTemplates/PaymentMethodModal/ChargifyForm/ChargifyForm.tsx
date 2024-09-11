import { useEffect, useRef } from 'react'
import { Button, useTheme } from '@mui/material'

import useAccountSubscription from 'hooks/user/useAccountSubscription'
import { CHARGIFY_PUBLIC_KEY, CHARGIFY_SERVER_HOST } from 'App'
import ChargifyCreditCardForm from 'design/molecules/ChargifyCreditCardForm'
import { useActivatePlanMutation, useUpdateCreditCardByTokenMutation } from 'api/mutations'
import { useChagifyTokenStatus } from 'hooks/chargify.hooks'

import locale from '../PaymentMethodModal.locale'
import './index.scss'

type ChargifyFormProps = {
    planTransition?: boolean
    onClose: () => void
}

// DEPRECATED. New design is src/design/molecules/CreditCardForm
const ChargifyForm = ({ planTransition, onClose }: ChargifyFormProps) => {
    const { transition } = useAccountSubscription()
    const updateCreditCardByTokenMutation = useUpdateCreditCardByTokenMutation()
    const activatePlanMutation = useActivatePlanMutation()
    const formRef = useRef(null)
    const theme = useTheme()
    const chargify = useRef(window.Chargify ? new window.Chargify() : null)
    const { chargifyTokenSuccess, chargifyTokenError } = useChagifyTokenStatus()

    const handleSubmit = () => {
        chargify.current?.token(
            formRef.current,

            chargifyTokenSuccess(async (token) => {
                await updateCreditCardByTokenMutation.mutateAsync({
                    token,
                })

                if (planTransition && transition?.apiHandle) {
                    await activatePlanMutation.mutateAsync({
                        apiHandle: transition.apiHandle,
                        pricePoint: transition.pricePoint,
                    })
                }

                onClose()
            }),
            chargifyTokenError,
        )
    }

    useEffect(() => {
        chargify.current?.load({
            selector: '#user-chargify-form',
            publicKey: CHARGIFY_PUBLIC_KEY,
            type: 'card',
            serverHost: CHARGIFY_SERVER_HOST,
            hideCardImage: true,
            optionalLabel: '',
            requiredLabel: '',
            addressDropdowns: true,
            style: {
                field: {
                    overflow: 'hidden',
                    margin: 0,
                },
                input: {
                    ...theme.typography.body1,
                    color: theme.palette.text.primary,
                    borderRadius: 1,
                    padding: '9.5px 14px',
                    height: '42px',
                    background: theme.palette.background.default,
                    placeholder: { color: theme.palette.text.secondary },
                },
                label: {
                    ...theme.typography.body2,
                    color: theme.palette.text.secondary,
                    margin: '0 0 6px 0',
                },
                message: {
                    ...theme.typography.caption,
                    color: theme.palette.error.main,
                },
            },
            fields: {
                firstName: {
                    selector: '#chargify-firstname',
                    required: true,
                    message: 'Please enter a valid first name',
                    maxlength: '30',
                    ...locale.input.user.firstName,
                },
                lastName: {
                    selector: '#chargify-lastname',
                    required: true,
                    message: 'Please enter a valid last name',
                    maxlength: '30',
                    ...locale.input.user.lastName,
                },
                number: {
                    selector: '#chargify-card',
                    message: 'Please enter a valid card number',
                    ...locale.input.creditCard.number,
                },
                month: {
                    selector: '#chargify-month',
                    message: ' ',
                    ...locale.input.creditCard.month,
                },
                year: {
                    selector: '#chargify-year',
                    message: ' ',
                    ...locale.input.creditCard.year,
                },
                cvv: {
                    selector: '#chargify-cvv',
                    required: true,
                    message: ' ',
                    ...locale.input.creditCard.cvv,
                },
                zip: {
                    selector: '#chargify-zip',
                    required: true,
                    message: 'Please enter a valid zip code',
                    maxlength: '10',
                    ...locale.input.user.zip,
                },
            },
        })

        return () => {
            chargify.current?.unload()
        }
    }, [theme])

    return (
        <form ref={formRef} id="user-chargify-form">
            <ChargifyCreditCardForm />

            <Button variant="contained" onClick={handleSubmit}>
                Save
            </Button>
        </form>
    )
}

export default ChargifyForm
