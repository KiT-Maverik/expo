import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

import { VideoEmbed, PublicPreviewCode } from 'types/Video'
import { useCopyToClipboard } from 'hooks/system/useCopyToClipboard'
import { trackAppCuesEvent, APPCUES_EVENTS } from 'thirdPartyServices/appCues'
import {
    QuickShareLinkType,
    EmbedVideoType,
} from 'design/templates/Modal/modalTemplates/EmbedCodeModalVidConditions/EmbedCodeModal'

import locale from './EmbedCodeShareLink.locale'
import style from './EmbedCodeShareLink.style'

type EmbedCodeShareLinkProps = {
    label: string
    embed?: VideoEmbed
    linkType: QuickShareLinkType
    embedType: EmbedVideoType
    handleCopy: () => void
}

const EmbedCodeShareLink = ({ label, embed, linkType, embedType, handleCopy }: EmbedCodeShareLinkProps) => {
    const { copy } = useCopyToClipboard()

    const getLink = () => {
        if (!embed) return ''

        if (embed && !embed.isPublicPreviewAllowed) {
            return locale.sharingDisabled
        }

        const publicPreviewKey = `${linkType}${embedType === 'async' ? 'Async' : 'Sync'}` as keyof PublicPreviewCode
        return embed[publicPreviewKey].replace('video', 'vid')
    }

    const handleCopyQuickShareLink = (value: string) => {
        copy(value)
        trackAppCuesEvent(APPCUES_EVENTS.EMBED_LINK_COPIED)
        handleCopy()
    }

    const value = getLink()

    return (
        <Box>
            <Typography variant="body2" fontWeight="bold" gutterBottom>
                {label}
            </Typography>
            <Stack direction="row" gap={4} alignItems="start">
                <Stack justifyContent="center" flexGrow="1" sx={style.container}>
                    <Typography variant="body1" color="text.disabled" sx={style.link}>
                        {value}
                    </Typography>
                </Stack>
                <Button
                    variant="contained"
                    color="secondary"
                    disabled={!embed?.isPublicPreviewAllowed}
                    onClick={() => handleCopyQuickShareLink(value)}
                >
                    {locale.quickShare}
                </Button>
            </Stack>
        </Box>
    )
}

export default EmbedCodeShareLink
