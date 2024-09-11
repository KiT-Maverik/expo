import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

import { Modal } from 'design/templates/Modal'
import useEmbedCode from 'hooks/video/useEmbedCode'
import { useLayout } from 'hooks/utilities/useLayout'
import { TRAINING_CENTER_VIDEOS } from 'design/pages/TrainingCenter/TrainingCenter.constants'
import { CUSTOMER_ID } from 'constants/video.constants'
import { route } from 'constants/routes'

import style from './TrainingCenterVideoModal.style'

export const TrainingCenterVideoModal = () => {
    const { isTablet } = useLayout()
    const { id } = useParams()
    const navigate = useNavigate()
    const video = TRAINING_CENTER_VIDEOS.find((video) => video.id === id)

    useEffect(() => {
        if (!video) {
            navigate(route.trainingCenter.index)
        }
    }, [video])

    if (!video) {
        return null
    }

    const { title, description, embedId } = video
    const { player } = useEmbedCode(CUSTOMER_ID, embedId)

    const handleClose = () => navigate(route.trainingCenter.index)

    return (
        <Modal
            open={Boolean(embedId)}
            onClose={handleClose}
            aria-labelledby="video-modal-title"
            aria-describedby="video-modal-description"
            isFullscreen
            stackProps={{
                sx: style.container,
            }}
            width="xl"
        >
            <Modal.Header nodeTitle onClose={handleClose}>
                <Typography variant="h7" margin="auto" width="100%" textAlign="center">
                    {title}
                </Typography>
            </Modal.Header>
            <Modal.Body>
                <Box maxWidth="min-content">
                    <Typography align="center" variant={isTablet ? 'body2' : 'body1'} sx={style.description}>
                        {description}
                    </Typography>

                    <Box position="relative" sx={style.videoWrapper}>
                        <Box id={`vidalytics_embed_${embedId}`} sx={style.video} />
                        {!player && <Skeleton sx={style.skeleton} variant="rectangular" />}
                    </Box>
                </Box>
            </Modal.Body>
        </Modal>
    )
}

export default TrainingCenterVideoModal
