import { Box, IconButton, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import Grow from '@mui/material/Grow'
import { ReactComponent as CongratsIcon } from 'assets/img/agency/checkmark-with-confetti.svg'
import { useCopyToClipboard } from 'hooks/system/useCopyToClipboard'
import style from './Congratulations.styles'
import locale from './Congratulations.locale'

interface CongratulationsProps {
    link: string
    show: boolean
}

export const Congratulations = ({ link, show }: CongratulationsProps) => {
    const { copy } = useCopyToClipboard()

    return (
        <Grow in={show} unmountOnExit>
            <Box sx={style.wrapper}>
                <Stack sx={style.container}>
                    <CongratsIcon style={{ margin: '0 auto' }} />
                    <Typography variant="h6" textAlign="center">
                        {locale.title}
                    </Typography>
                    <Typography textAlign="center">{locale.message}</Typography>
                    <Box>
                        <Typography mb={2}>{locale.action}</Typography>
                        <Box sx={style.invitation.container}>
                            <Typography sx={style.invitation.link}>{link}</Typography>
                            <IconButton onClick={() => copy(link)}>
                                <ContentCopyRoundedIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Grow>
    )
}
