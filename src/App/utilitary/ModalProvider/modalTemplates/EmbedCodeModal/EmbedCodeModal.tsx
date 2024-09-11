import { isBoolean } from 'lodash'
import { useState, useEffect, SyntheticEvent, ChangeEvent, useCallback } from 'react'
import { Box, Button, Typography, Tabs, Tab, Stack, RadioGroup, Radio, FormControlLabel, Checkbox } from '@mui/material'
import mixpanel from 'mixpanel-browser'

import useFeatureFlags, { VID_4622 } from 'hooks/system/useFeatureFlags'
import { Modal } from 'design/templates/Modal'
import { PublicPreviewCode } from 'types/Video'
import { CustomerStatus } from 'types/Customer'
import { useSetVideoEmbedPublicShareMutation } from 'api/mutations'
import { useVideoEmbedQuery, useSmartVidEmbedQuery, useCustomerQuery, useCustomerSubscriptionQuery } from 'api/queries'
import { useCopyToClipboard } from 'hooks/system/useCopyToClipboard'
import { trackAppCuesEvent, APPCUES_EVENTS } from 'thirdPartyServices/appCues'
import { route } from 'constants/routes'
import locale from './EmbedCodeModal.locale'

import style from './EmbedCodeModal.style'
import TabPanel from './TabPanel'

type EmbedCodeModalProps = {
    videoId?: string
    funnelId?: string
    smartVid?: boolean
    onClose: () => void
}

const tabProps = (index: number) => ({
    id: `embed-code-${index}`,
    'aria-controls': `embed-code-panel-${index}`,
})

enum Embeds {
    video = 'video',
    smartVid = 'smartVid',
}

type EmbedVideoType = 'async' | 'multiple'

type QuickShareLinkType = 'preview' | 'oEmbed'

export const EmbedCodeModal = ({ videoId, funnelId, smartVid, onClose }: EmbedCodeModalProps) => {
    const { funnelEmbedCodeApiChange, featureFlags } = useFeatureFlags()
    const { copy } = useCopyToClipboard()

    const embedCanBeLoaded = isBoolean(featureFlags[VID_4622])
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

    const getLink = (key: QuickShareLinkType) => {
        if (!embed) return ''

        if (embed && !embed.isPublicPreviewAllowed) {
            return locale.notification.sharingDisabled
        }

        const publicPreviewKey = `${key}${embedCodeType === 'async' ? 'Async' : 'Sync'}` as keyof PublicPreviewCode
        return embed[publicPreviewKey].replace('video', 'vid')
    }

    const handleTabChange = (_: SyntheticEvent, newValue: number) => {
        setTab(newValue)
    }

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmbedCodeType((event.target as HTMLInputElement).value as EmbedVideoType)
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
                segmentation: 0, // segmentation is disabled
            }),
        })
    }

    const handleCopyQuickShareLink = (value: string, type: QuickShareLinkType) => {
        copy(value)
        trackAppCuesEvent(APPCUES_EVENTS.EMBED_LINK_COPIED)
        mixpanel.track(`${eventPrefix}_link_copied`, {
            ...trackingEvent,
            type: type === 'oEmbed' ? 'oembed' : 'quickshare',
        })
    }

    const renderShareLink = useCallback(
        (label: string, type: QuickShareLinkType) => {
            const value = getLink(type)

            return (
                <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                        {label}
                    </Typography>
                    <Stack direction="row" gap={4} alignItems="start">
                        <Stack justifyContent="center" flexGrow="1" sx={style.oEmbedLink.container}>
                            <Typography variant="body1" color="text.disabled" sx={style.oEmbedLink.item}>
                                {value}
                            </Typography>
                        </Stack>
                        <Button
                            variant="contained"
                            color="secondary"
                            disabled={!embed?.isPublicPreviewAllowed}
                            onClick={() => handleCopyQuickShareLink(value, type)}
                        >
                            {locale.quickShare.cta}
                        </Button>
                    </Stack>
                </Box>
            )
        },
        [embed],
    )

    return (
        <Modal open onClose={onClose} stackProps={{ sx: style.container }} width="lg">
            <Modal.Header onClose={onClose} nodeTitle>
                <Tabs value={tab} onChange={handleTabChange}>
                    <Tab label={locale.tab.inlineEmbed} {...tabProps(0)} sx={style.tab} />
                    <Tab
                        label={locale.tab.quickShare}
                        {...tabProps(1)}
                        data-testid="publicPreviewPanel"
                        sx={style.tab}
                    />
                </Tabs>
            </Modal.Header>
            <Modal.Body>
                <TabPanel value={tab} index={0}>
                    <Stack gap={4}>
                        <Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                {locale.embed.title}
                            </Typography>
                            <Typography variant="body2">
                                Processing your vid can take up to 60 minutes before it is ready to play. Although
                                it&apos;s typically much faster.
                            </Typography>
                        </Box>
                        <Stack gap={4} alignItems="flex-end">
                            <Typography
                                sx={[
                                    style.inlineEmbed.snippet.idle,
                                    isLoading || isFetching
                                        ? style.inlineEmbed.snippet.loading
                                        : style.inlineEmbed.snippet.ready,
                                ]}
                                variant="body2"
                                color="text.secondary"
                            >
                                {isLoading || isFetching ? `${locale.notification.loading}...` : embedCode}
                            </Typography>
                            <Button variant="contained" onClick={handleCopyEmbedCode}>
                                {locale.embed.cta}
                            </Button>
                        </Stack>
                        <Stack gap={2} direction="column">
                            <Typography variant="subtitle1" fontWeight={600}>
                                {locale.embed.type.title}
                            </Typography>
                            <RadioGroup
                                value={embedCodeType}
                                onChange={handleRadioChange}
                                sx={style.inlineEmbed.option.title}
                            >
                                <Stack gap={2} direction="column">
                                    <FormControlLabel
                                        value="async"
                                        control={<Radio size="small" sx={style.radio.item} />}
                                        label={`${locale.embed.type.async.title} - ${locale.embed.type.async.description}`}
                                        sx={style.radio.label}
                                    />
                                    <FormControlLabel
                                        value="multiple"
                                        control={<Radio size="small" sx={style.radio.item} />}
                                        label={
                                            <>
                                                {locale.embed.type.multiple.title} -{' '}
                                                <Typography component="span" variant="caption2" color="text.secondary">
                                                    {locale.embed.type.multiple.description}
                                                </Typography>
                                            </>
                                        }
                                        sx={style.radio.label}
                                    />
                                </Stack>
                            </RadioGroup>
                        </Stack>
                    </Stack>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <Stack gap={6}>
                        <Stack gap={4}>
                            <Typography variant="h6" fontWeight="bold">
                                {locale.quickShare.publicPreview.label}
                            </Typography>
                            <FormControlLabel
                                disabled={setVideoEmbedPublicShareMutation.isLoading}
                                label={locale.quickShare.publicPreview.description}
                                checked={!embed?.isPublicPreviewAllowed}
                                control={<Checkbox onChange={setPublicPreviewPermission} />}
                            />
                        </Stack>
                        <Stack gap={4}>
                            {renderShareLink(locale.quickShare.link.quickShare, 'preview')}
                            {renderShareLink(locale.quickShare.link.oEmbed, 'oEmbed')}
                        </Stack>
                    </Stack>
                </TabPanel>
            </Modal.Body>
        </Modal>
    )
}
