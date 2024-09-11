import { ReactNode } from 'react'
import { Box, Button, Skeleton, Stack, Typography } from '@mui/material'

import { Modal } from 'design/templates/Modal'
import LightningStrike from 'assets/img/freemium/lightning-strike.svg'
import Lightning from 'assets/img/freemium/lightning-strike-white.svg'

import { Plan } from 'types/Customer'
import { ModalType } from 'design/templates/Modal/ModalTypes/types'
import { useLayout } from 'hooks/utilities/useLayout'
import style from './FeatureLockedModal.style'

export interface FeatureLockedProps {
    title?: string
    description?: string
    children?: ReactNode
    proPlan?: Plan
    isUserOnTrial?: boolean
    onCloseClick?(): void
    onUpgradeClick?: () => void
    containerRef?: HTMLDivElement
}

export interface FeatureLockedOpenModalPayload extends FeatureLockedProps {
    type: ModalType.FEATURE_LOCKED
}

type FeatureLockedModalProps = FeatureLockedProps & {
    onClose: () => void
}

export const FeatureLockedModal = ({
    title,
    description,
    children,
    proPlan,
    isUserOnTrial,
    onCloseClick,
    containerRef,
    onUpgradeClick,
    onClose,
}: FeatureLockedModalProps) => {
    const { isMobile, isTablet } = useLayout()

    const handleClose = () => {
        onClose()
        onCloseClick?.()
    }

    return (
        <Modal open onClose={handleClose} container={isMobile ? undefined : containerRef} sx={style.modal} width="lg">
            <Modal.Header onClose={handleClose}>
                <Stack width={1}>
                    <Typography variant="h5" sx={style.title}>
                        <Box sx={style.titleImage} component="span">
                            <img src={LightningStrike} alt="" />
                        </Box>{' '}
                        {title}
                    </Typography>
                    <Typography sx={style.description} variant="body2">
                        {description}
                    </Typography>
                </Stack>
            </Modal.Header>
            <Modal.Body>
                {children}

                <Box
                    alignItems="center"
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="space-between"
                    sx={[style.upgradeNow.root, isTablet && style.upgradeNow.rootLessMd]}
                >
                    <Box sx={[style.upgradeNow.text, isMobile && style.upgradeNow.textLessSm]}>
                        <Typography sx={style.upgradeNow.title} variant="h6">
                            {proPlan?.price ? (
                                <>Just ${Number(proPlan.price)} per month</>
                            ) : (
                                <Skeleton
                                    sx={[isMobile && style.upgradeNow.skeletonLessSm]}
                                    width={150}
                                    height={22}
                                    animation="wave"
                                />
                            )}
                        </Typography>
                        <Typography sx={style.upgradeNow.description} variant="caption2">
                            Upgrade Now to Unlock this Feature
                        </Typography>
                    </Box>
                    <Box sx={[style.upgradeNow.actions, isMobile && style.upgradeNow.actionsLessSm]}>
                        <Button
                            color="accent"
                            onClick={onUpgradeClick}
                            variant="contained"
                            sx={style.upgradeNow.button.root}
                        >
                            <Box sx={style.upgradeNow.button.image}>
                                <img src={Lightning} alt="" />
                            </Box>
                            {isUserOnTrial ? 'Upgrade Now' : 'Start Your Free Trial'}
                        </Button>
                    </Box>
                </Box>
            </Modal.Body>
        </Modal>
    )
}
