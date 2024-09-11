import { ReactNode } from 'react'

import { Box, Typography } from '@mui/material'
import { Modal } from 'design/templates/Modal'

import style from './ReplaceVidSuccessModal.style'

interface ReplaceVidConfirmationModalProps {
    open: boolean
    title: string
    children: ReactNode
}

export const ReplaceVidSuccessModal = ({ open, title, children }: ReplaceVidConfirmationModalProps) => {
    return (
        <Modal open={open} onClose={() => undefined} width="sm">
            <Modal.Header title={title} />
            <Modal.Body>
                <Box sx={style.container}>
                    <Typography sx={style.description} component="p">
                        There’s nothing else you need to do. :)
                    </Typography>
                    <Typography sx={style.description} component="p">
                        It may take up to a few minutes to become live on all web pages where you have it embedded.
                    </Typography>
                    {children}
                </Box>
            </Modal.Body>
        </Modal>
    )
}
