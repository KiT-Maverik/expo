import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import { route } from 'constants/routes'

import './index.scss'

type VideosWarningProps = {
    onCancel: () => void
    onClose: () => void
}

export const VideosWarning = ({ onCancel, onClose }: VideosWarningProps) => {
    const navigate = useNavigate()

    return (
        <Box className="VideosWarning">
            <Typography className="title">
                <WarningAmberOutlinedIcon /> You must delete some videos before downgrading
            </Typography>
            <Typography className="description">
                You currently have more than 3 videos in your account. Delete any you don&apos;t want to store anymore
                before you proceed to downgrade.
            </Typography>
            <Box className="buttonsContainer">
                <Button variant="outlined" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        onClose()
                        navigate(route.video.catalog)
                    }}
                >
                    Go to My Vids
                </Button>
            </Box>
        </Box>
    )
}
