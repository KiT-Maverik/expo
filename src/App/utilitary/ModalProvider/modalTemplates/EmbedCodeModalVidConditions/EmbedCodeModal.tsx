import { useState, useEffect, SyntheticEvent, ChangeEvent } from 'react'
import mixpanel from 'mixpanel-browser'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import _isBoolean from 'lodash/isBoolean'

import { useAppDispatch } from 'App'
import useAccountSubscription from 'hooks/user/useAccountSubscription'
import useFeatureFlags, { VID_4622 } from 'hooks/system/useFeatureFlags'
import { Link } from 'design/atoms/Link'
import { HelpTooltip } from 'design/atoms/HelpTooltip'
import { CustomerStatus } from 'types/Customer'
import { useSetVideoEmbedPublicShareMutation } from 'api/mutations'
import {
    useVideoEmbedQuery,
    useSmartVidEmbedQuery,
    useCustomerQuery,
    useCustomerSubscriptionQuery,
    useVideoQuery,
} from 'api/queries'
import useTariffPlans from 'hooks/user/useTariffPlans'
import { useCopyToClipboard } from 'hooks/system/useCopyToClipboard'
import { trackAppCuesEvent, APPCUES_EVENTS } from 'thirdPartyServices/appCues'
import { ConversionsLockedContent } from 'design/pages/Conversions'
import EmbedCodeTabPanel from 'design/templates/Modal/modalTemplates/EmbedCodeModalVidConditions/EmbedCodeTabPanel'
import EmbedCodeShareLink from 'design/templates/Modal/modalTemplates/EmbedCodeModalVidConditions/EmbedCodeShareLink'
import VidConditions from 'design/organisms/VidConditions'
import PublishButton from 'design/molecules/PublishButton'
import ProLabel from 'design/molecules/ProLabel'
import { VideoGuid } from 'types/Video'
import {
    Modal,
    openAgencyLockedFeaturesModal,
    openSubscriptionModal,
    setPlan,
    SubscriptionCtaSource,
} from 'design/templates/Modal'
import { closeModal, ModalType, openModal } from 'design/templates/Modal/ModalTypes/modal.slice'
import { useAgencyAccess } from 'design/pages/AgencyAccount/AgencyAccount.hooks'
import { useLayout } from 'hooks/utilities/useLayout'
import { Chip } from '@mui/material'
import { EmbedCode } from 'design/molecules/EmbedCode'
import { route } from 'constants/routes'
import helpArticles from 'constants/help.constants'

import locale from './EmbedCodeModal.locale'
import style from './EmbedCodeModal.style'

type EmbedCodeModalProps = {
    videoId?: string
    funnelId?: string
    smartVid?: boolean
    onClose: () => void
}

enum Embeds {
    video = 'video',
    smartVid = 'smartVid',
}

export type EmbedVideoType = 'async' | 'multiple'

export type QuickShareLinkType = 'preview' | 'oEmbed'

const tabProps = (index: number) => ({
    id: `embed-code-${index}`,
    'aria-controls': `embed-code-panel-${index}`,
    sx: style.tab,
})

export const EmbedCodeModalVidConditions = ({ videoId, funnelId, smartVid, onClose }: EmbedCodeModalProps) => {
    const dispatch = useAppDispatch()
    const { agencyAccessLocked } = useAgencyAccess()
    const { isFree } = useAccountSubscription()
    const [vidConditionsEnabled, setVidConditionsEnabled] = useState(false)
    const [segmentsCount, setSegmentsCount] = useState(0)
    const [isValid, setIsValid] = useState(true)
    const { funnelEmbedCodeApiChange, featureFlags } = useFeatureFlags()
    const { isTablet } = useLayout()
    const { data } = useVideoQuery(videoId as VideoGuid)
    const { copy } = useCopyToClipboard()
    const { pro: proPlan } = useTariffPlans()

    const embedCanBeLoaded = _isBoolean(featureFlags[VID_4622])
    const embedTypeToUse = embedCanBeLoaded
        ? smartVid && funnelEmbedCodeApiChange && Boolean(funnelId)
            ? Embeds.smartVid
            : Embeds.video
        : null
    const useSmartVidEmbed = embedTypeToUse === Embeds.smartVid
    const eventPrefix = useSmartVidEmbed ? 'smartvid_embed' : 'embed'

    const {
        data: videoEmbed,
        isLoading: isVideoEmbedQueryLoading,
        isFetching: isVideoEmbedQueryFetching,
    } = useVideoEmbedQuery(videoId, {
        enabled: embedTypeToUse === Embeds.video && Boolean(videoId),
    })
    const {
        data: smartVidEmbed,
        isLoading: isSmartVidEmbedQueryLoading,
        isFetching: isSmartVidEmbedQueryFetching,
    } = useSmartVidEmbedQuery(funnelId, {
        enabled: useSmartVidEmbed,
    })

    const { data: customer } = useCustomerQuery()
    const { data: subscription } = useCustomerSubscriptionQuery()

    const isTrial = subscription?.status === CustomerStatus.trial
    const embed = useSmartVidEmbed ? smartVidEmbed : videoEmbed
    const isLoading = useSmartVidEmbed ? isSmartVidEmbedQueryLoading : isVideoEmbedQueryLoading
    const isFetching = useSmartVidEmbed ? isSmartVidEmbedQueryFetching : isVideoEmbedQueryFetching

    const setVideoEmbedPublicShareMutation = useSetVideoEmbedPublicShareMutation(videoId, funnelId, useSmartVidEmbed)
    const [embedCodeType, setEmbedCodeType] = useState<EmbedVideoType>('async')
    const [tab, setTab] = useState(0)
    const embedCode = embed ? String(embed[embedCodeType]) : ''

    const handleTabChange = (_: SyntheticEvent, newValue: number) => {
        setTab(newValue)
    }

    const handleTypeChange = (_: SyntheticEvent, value: boolean) => {
        setEmbedCodeType(value ? 'multiple' : 'async')
    }

    useEffect(() => {
        mixpanel.track(`${eventPrefix}_open`, {
            ...(eventPrefix === 'smartvid_embed' && { smartvid_id: funnelId || null }),
            video_id: videoId || null,
        })
    }, [])

    const setPublicPreviewPermission = (event: ChangeEvent<HTMLInputElement>) => {
        setVideoEmbedPublicShareMutation.mutate({ isPublicPreviewAllowed: !event.target.checked })
    }

    const trackingEvent = {
        ...(eventPrefix === 'smartvid_embed' && { smartvid_id: funnelId || null }),
        video_id: videoId || null,
        pathname: smartVid ? route.smartVideo.catalog : route.video.catalog,
        created_at: customer?.dateCreated,
        user_id: customer?.guid,
        is_trial: `${isTrial}`,
        subscription_tier: subscription?.plan.tier,
        subscription_id: subscription?.plan.apiHandle,
        subscription_status: subscription?.status,
        subscription_istrial: subscription?.status === CustomerStatus.trial,
        url: window.location.href,
    }

    const handleCopyEmbedCode = () => {
        copy(embedCode)
        trackAppCuesEvent(APPCUES_EVENTS.EMBED_CODE_COPIED)
        mixpanel.track(`${eventPrefix}_code_copied`, {
            ...trackingEvent,
            type: embedCodeType === 'async' ? 'standard' : 'multiple videos',
            ...(eventPrefix === 'embed' && {
                segmentation: segmentsCount,
            }),
        })
    }

    const handleCopyLink = (type: QuickShareLinkType) => {
        mixpanel.track(`${eventPrefix}_link_copied`, {
            ...trackingEvent,
            type: type === 'oEmbed' ? 'oembed' : 'quickshare',
        })
    }

    const onUpgradeClick = () => {
        dispatch(closeModal())
        dispatch(setPlan({ plan: proPlan }))
        dispatch(
            openSubscriptionModal({
                ctaSource: SubscriptionCtaSource.VID_CONDITIONS,
            }),
        )
    }

    const handleUpgradeClick = () => {
        dispatch(
            openModal({
                type: ModalType.FEATURE_LOCKED,
                title: locale.upgradeToUnlock,
                description: locale.boostEngagement,
                proPlan,
                onUpgradeClick,
                children: <ConversionsLockedContent />,
            }),
        )
        return
    }

    return (
        <Modal onClose={onClose} width="lg" stackProps={{ sx: style.container }} open>
            <Modal.Header onClose={onClose} nodeTitle>
                <Tabs value={tab} onChange={handleTabChange}>
                    <Tab label={locale.tab.inlineEmbed} {...tabProps(0)} />
                    <Tab label={locale.tab.quickShare} data-testid="publicPreviewPanel" {...tabProps(1)} />
                </Tabs>
            </Modal.Header>
            <Modal.Body>
                <EmbedCodeTabPanel value={tab} index={0}>
                    <Stack>
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                {locale.title}
                            </Typography>
                            <Typography variant="body2">
                                {locale.description}{' '}
                                <Link to={helpArticles.multipleVideos} target="_blank" rel="noreferrer" external>
                                    {locale.learnMore}
                                </Link>
                            </Typography>
                        </Box>
                        <Stack mt={4} alignItems="flex-end">
                            <EmbedCode isLoading={isLoading || isFetching} embedCode={embedCode} />
                        </Stack>
                        <Stack mt={6}>
                            <FormControlLabel
                                onChange={handleTypeChange}
                                control={<Checkbox />}
                                label={
                                    <Stack mt="-3px" gap={1}>
                                        <Typography fontWeight={600}>{locale.multipleVideos}</Typography>
                                        <Typography variant="caption2">{locale.enableMultipleVideos}</Typography>
                                    </Stack>
                                }
                                sx={style.label}
                            />
                        </Stack>
                        <Stack my={6}>
                            <FormControlLabel
                                onClick={() => {
                                    if (agencyAccessLocked) dispatch(openAgencyLockedFeaturesModal({ fallback: false }))
                                    if (isFree) handleUpgradeClick()
                                }}
                                onChange={() =>
                                    !isFree && !agencyAccessLocked && setVidConditionsEnabled(!vidConditionsEnabled)
                                }
                                control={<Checkbox checked={vidConditionsEnabled} />}
                                label={
                                    <Stack mt="-3px" gap={1} direction="row" alignItems="center">
                                        <Typography fontWeight={600}>{locale.vidConditions}</Typography>
                                        <HelpTooltip title={locale.vidConditionsTip} sx={{ mt: '1px' }} />
                                        {isFree && (
                                            <Box sx={{ ml: 3 }}>
                                                <ProLabel
                                                    propsTooltip={{
                                                        title: locale.proLabel,
                                                        arrow: true,
                                                        placement: 'top',
                                                    }}
                                                />
                                            </Box>
                                        )}
                                        {agencyAccessLocked && (
                                            <Chip label="Feature locked" color="accent" size="small" />
                                        )}
                                    </Stack>
                                }
                                sx={style.label}
                            />
                            <Box mt={4} pl={8}>
                                <VidConditions
                                    onChange={({ enabled, valid, segmentsCount }) => {
                                        setIsValid(valid)
                                        setVidConditionsEnabled(enabled)
                                        setSegmentsCount(segmentsCount)
                                    }}
                                    fallback={videoId as VideoGuid}
                                    disabled={!vidConditionsEnabled}
                                />
                            </Box>
                        </Stack>
                        <Divider sx={{ width: 'calc(100% + 48px)', mx: -6 }} />
                        <Stack direction={isTablet ? 'column' : 'row'} justifyContent="space-between" gap={2} pt={5}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <InfoOutlinedIcon color="info" />
                                <Typography variant="body2">{locale.processingTime}</Typography>
                            </Stack>
                            <Stack gap={2} direction="row" justifyContent="flex-end">
                                <PublishButton
                                    onClick={() => setIsValid(true)}
                                    videoGuid={videoId as VideoGuid}
                                    title={locale.republish}
                                    propsButton={{
                                        color: 'secondary',
                                        disabled: !data?.video?.isUnpublished || !isValid,
                                    }}
                                />
                                <Button
                                    onClick={handleCopyEmbedCode}
                                    variant="contained"
                                    startIcon={<CodeRoundedIcon />}
                                >
                                    {locale.copyCode}
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </EmbedCodeTabPanel>
                <EmbedCodeTabPanel value={tab} index={1}>
                    <Stack gap={6}>
                        <Stack gap={4}>
                            <Typography variant="h6" fontWeight="bold">
                                {locale.quickShareLabel}
                            </Typography>
                            <FormControlLabel
                                disabled={setVideoEmbedPublicShareMutation.isLoading}
                                label={locale.quickShareDescription}
                                checked={!embed?.isPublicPreviewAllowed}
                                control={<Checkbox onChange={setPublicPreviewPermission} />}
                            />
                        </Stack>
                        <Stack gap={4}>
                            <EmbedCodeShareLink
                                label={locale.linkQuickShare}
                                embed={embed}
                                linkType="preview"
                                embedType={embedCodeType}
                                handleCopy={() => handleCopyLink('preview')}
                            />
                            <EmbedCodeShareLink
                                label={locale.linkOEmbed}
                                embed={embed}
                                linkType="oEmbed"
                                embedType={embedCodeType}
                                handleCopy={() => handleCopyLink('oEmbed')}
                            />
                        </Stack>
                    </Stack>
                </EmbedCodeTabPanel>
            </Modal.Body>
        </Modal>
    )
}

export default EmbedCodeModalVidConditions
