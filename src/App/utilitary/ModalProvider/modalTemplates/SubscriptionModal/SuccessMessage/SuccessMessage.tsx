import { Box, Typography, Button } from '@mui/material'

import { Link } from 'design/atoms/Link'
import SuccessCheckmark from 'assets/img/freemium/checkmarks/success-checkmark-white-bg.svg'
import { route } from 'constants/routes'

import './index.scss'

type SuccessMessageProps = {
    mainTitle: string
    title: string
    description: string
    onClose: () => void
}

export const SuccessMessage = ({ mainTitle, title, description, onClose }: SuccessMessageProps) => {
    return (
        <Box className="SuccessMessage">
            <Box className="checkmark">
                <img src={SuccessCheckmark} alt="success-icon" />
            </Box>
            <Typography className="mainTitle">{mainTitle}</Typography>
            <Typography className="title">{title}</Typography>
            <Typography className="desc">{description}</Typography>
            <Typography className="title">Knowledge Center</Typography>
            <Typography className="desc">
                Head over to our{' '}
                <Link target="_blank" rel="noreferrer" to={route.static.help.index} external>
                    Knowledge Center
                </Link>{' '}
                to learn the most advanced and useful tools inside of Vidalytics. If you ever need any help, just email
                us at{' '}
                <Link to={route.mail.hi} external>
                    hi@vidalytics.com
                </Link>
                .
            </Typography>
            <Box className="buttonContainer">
                <Button variant="outlined" onClick={onClose}>
                    Done
                </Button>
            </Box>
        </Box>
    )
}
