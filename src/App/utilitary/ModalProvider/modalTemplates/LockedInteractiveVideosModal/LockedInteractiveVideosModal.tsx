import { Box, List, ListItem, Typography, Button, Avatar, Stack } from '@mui/material'
import BoltIcon from '@mui/icons-material/Bolt'
import CheckIcon from '@mui/icons-material/Check'

import { Modal } from 'design/templates/Modal'
import LightningIcon from 'assets/img/freemium/lightning-strike-blue-bold.svg'
import { useAppDispatch } from 'App'
import { closeModal } from 'design/templates/Modal/ModalTypes/modal.slice'
import { useCustomerSubscriptionQuery } from 'api/queries'
import {
    openSubscriptionModal,
    SubscriptionSteps,
    SubscriptionCtaSource,
} from 'design/templates/Modal/modalTemplates/SubscriptionModal/subscription.slice'
import { useLayout } from 'hooks/utilities/useLayout'
import Awards from 'design/molecules/Awards'
import { BillingMode, CustomerSubscriptionPlanTier } from 'types/Customer'
import { LockedInteractiveVideosProps } from 'design/templates/Modal/ModalTypes/types'
import { clients } from 'constants/clients.constants'
import { features } from './LockedInteractiveVideosModal.utils'

import locale from './LockedInteractiveVideosModal.locale'
import style from './LockedInteractiveVideosModal.style'

export interface LockedInteractiveVideosModalProps extends LockedInteractiveVideosProps {
    onClose(): void
}

export const LockedInteractiveVideosModal = ({ containerRef, onClose }: LockedInteractiveVideosModalProps) => {
    const { isTablet, isMobile } = useLayout()
    const dispatch = useAppDispatch()
    const { data: subscription } = useCustomerSubscriptionQuery()
    const isPlayMode = subscription?.plan?.billingMode === BillingMode.play

    const renderFeatures = (from: number, to?: number) => {
        let items = features

        if (isPlayMode) {
            items = features.filter((item: string) => item !== locale.features.list.gbOfMonthlyBandwidth)
        }

        return items.slice(from, to).map((label) => (
            <ListItem key={label} sx={style.features.listItem.root}>
                <CheckIcon color="primary" />
                <Typography sx={style.features.listItem.text} variant="body2">
                    {label}
                </Typography>
            </ListItem>
        ))
    }

    const handleCtaClick = () => {
        dispatch(
            openSubscriptionModal({
                step: SubscriptionSteps.ACTIVATION_STEP,
                lookForTier: CustomerSubscriptionPlanTier.enterprise,
                containerRef,
                hideBreadcrumb: true,
                ctaSource: SubscriptionCtaSource.SMART_VIDS,
            }),
        )
        dispatch(closeModal())
    }

    return (
        <Modal
            open
            onClose={onClose}
            isFullscreen
            container={isMobile ? undefined : containerRef}
            sx={style.modal}
            stackProps={{ sx: style.container }}
        >
            <Modal.Header onClose={onClose}>
                <Stack>
                    <Typography variant={isTablet ? 'h6' : 'h5'} sx={style.title}>
                        <Box sx={style.titleImage} component="span">
                            <img src={LightningIcon} alt="" />
                        </Box>
                        {locale.title}
                    </Typography>
                </Stack>
            </Modal.Header>
            <Modal.Body>
                <Typography sx={style.description} variant="body1">
                    {locale.description}
                </Typography>
                <Box sx={style.promoContainer}>
                    <Typography variant="body1" sx={style.features.title}>
                        {locale.features.title}
                    </Typography>

                    <List sx={style.features.list}>
                        <Box mb={1}>{renderFeatures(0, 4)}</Box>
                        <Box mb={1}>{renderFeatures(4, 8)}</Box>
                        <Box mb={1}>{renderFeatures(8)}</Box>
                    </List>

                    <Box display="flex" alignItems="center" justifyContent="space-between" sx={style.cta.root}>
                        <Box sx={style.cta.description}>
                            <Typography variant="body1" sx={style.cta.title}>
                                {locale.cta.title}
                            </Typography>
                            <Typography variant="caption2">{locale.cta.subtitle}</Typography>
                        </Box>
                        <Button
                            variant="contained"
                            color="accent"
                            onClick={handleCtaClick}
                            startIcon={<BoltIcon />}
                            sx={style.cta.button}
                        >
                            {locale.cta.button}
                        </Button>
                    </Box>

                    <Box display="flex" alignItems="center" sx={style.awards.root}>
                        <Avatar src="/img/auth/jon-benson.png" variant="square" sx={style.awards.avatar} />
                        <Box sx={style.quote.root}>
                            <Typography variant="caption2">{locale.awards.title}</Typography>
                            <Typography>
                                <Box sx={style.quote.name} component="span">
                                    {locale.awards.name} •{' '}
                                </Box>
                                {locale.awards.description}
                            </Typography>
                        </Box>
                        <Awards size="lg" />
                    </Box>
                </Box>

                <Box sx={style.clients.container}>
                    <Typography variant="h5" sx={style.clients.text}>
                        {locale.clients.title}
                    </Typography>
                    {clients.map(({ src, alt }) => (
                        <img src={src} alt={alt} key={src} />
                    ))}
                </Box>
            </Modal.Body>
        </Modal>
    )
}
