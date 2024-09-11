import { Button, Stack, Typography } from '@mui/material'
import _get from 'lodash/get'
import { useEffect, useRef, useState } from 'react'

import { Modal, SubscriptionCtaSource, SubscriptionSteps, openSubscriptionModal, setPlan } from 'design/templates/Modal'
import { useCustomerQuery, usePlanQuery } from 'api/queries'
import { useSetUpsellShownMutation } from 'api/mutations'
import { useAppDispatch } from 'App'

import locale from './UpsellBannerModal.locale'
import style from './UpsellBannerModal.style'

export const UpsellBannerModal = () => {
    const [open, setOpen] = useState(false)
    const sentRef = useRef(false)

    const { data: customer } = useCustomerQuery()

    const upsellPlan = _get(customer, 'featureFlags.upsell_banner.plan') as string
    const { data: plan } = usePlanQuery(upsellPlan, { enabled: Boolean(upsellPlan) })

    const { mutate } = useSetUpsellShownMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        const upsellId = _get(customer, 'featureFlags.upsell_banner.id') as string

        if (upsellId && !sentRef.current) {
            setOpen(true)
            sentRef.current = true
            mutate({ upsellName: upsellId })
        }
    }, [customer])

    const closeModal = () => setOpen(false)

    const handleConfirm = () => {
        dispatch(
            setPlan({
                plan,
                options: {
                    addons: _get(customer, 'featureFlags.upsell_banner.components'),
                },
            }),
        )
        dispatch(
            openSubscriptionModal({
                step: SubscriptionSteps.ACTIVATION_STEP,
                ctaSource: SubscriptionCtaSource.UPSELL_BANNER,
            }),
        )
        closeModal()
    }

    return (
        <Modal open={open} stackProps={{ sx: style.modal.root }} onClose={closeModal}>
            <Modal.Header nodeTitle>
                <Stack alignItems="center" gap={3}>
                    <Typography variant="h4" fontWeight="bold">
                        {locale.title}
                    </Typography>
                    <Typography variant="h7" fontWeight="bold">
                        {locale.description}
                    </Typography>
                </Stack>
            </Modal.Header>

            <Modal.Body sx={style.modal.body}>
                <img src="/img/temporary/upsell-banner.png" alt="Banner" />

                <Typography variant="subtitle1">{locale.content}</Typography>
            </Modal.Body>

            <Modal.Actions sx={style.modal.actions}>
                <Button color="tertiary" variant="text" size="x2Large" onClick={closeModal}>
                    {locale.cta.cancel}
                </Button>
                <Button color="accent" variant="contained" size="x2Large" onClick={handleConfirm}>
                    {locale.cta.confirm}
                </Button>
            </Modal.Actions>

            <Typography variant="caption2" textAlign="center">
                {locale.disclaimer}
            </Typography>
        </Modal>
    )
}
