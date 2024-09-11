import { useCallback } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { CodeRounded } from '@mui/icons-material'
import mixpanel from 'mixpanel-browser'

import { EmbedCode } from 'design/molecules/EmbedCode'
import { Modal } from 'design/templates/Modal'
import { Conversion } from 'types/Conversion'
import { useCopyToClipboard } from 'hooks/system/useCopyToClipboard'
import { useConversionEmbedQuery } from 'api/queries'
import { MIXPANEL_EVENTS } from 'thirdPartyServices/mixpanel'
import { trackAppCuesEvent, APPCUES_EVENTS } from 'thirdPartyServices/appCues'

import locale from './ConversionEmbedCodeModal.locale'
import styles from './ConversionEmbedCodeModal.style'

interface ConversionEmbedCodeModalProps {
    conversion: Conversion
    onClose: () => void
}

export const ConversionEmbedCodeModal = ({ conversion: { guid }, onClose }: ConversionEmbedCodeModalProps) => {
    const { data: embed, isLoading } = useConversionEmbedQuery(guid)
    const { copy } = useCopyToClipboard()

    const embedCode = embed?.code ?? ''

    const handleClick = useCallback(() => {
        trackAppCuesEvent(APPCUES_EVENTS.CONVERSION_CODE_COPIED)
        mixpanel.track(MIXPANEL_EVENTS.CONVERSION_CODE_COPIED, { conversion_id: guid })
        copy(embedCode)
    }, [copy, embedCode])

    return (
        <Modal width="lg" open onClose={onClose} aria-labelledby="conversion-embed-code-modal">
            <Modal.Header onClose={onClose} title={locale.title} />
            <Modal.Body sx={styles.body}>
                <Typography variant="body2" color="text.secondary">
                    Place this script just after the opening &lt;body&gt; tag on any page you want to count as a
                    conversion.
                </Typography>

                <Divider />

                <EmbedCode isLoading={isLoading} embedCode={embedCode} />
            </Modal.Body>

            <Modal.Actions>
                <Button startIcon={<CodeRounded />} variant="contained" onClick={handleClick}>
                    {locale.copyButton}
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
