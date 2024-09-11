import { ReactNode } from 'react'
import { Box, Typography, Skeleton } from '@mui/material'

import ChechmarkBlack from 'assets/img/freemium/checkmarks/checkmark-black.svg'

type FeatureProps = {
    children: ReactNode
    isLoading: boolean
}

export const Feature = ({ isLoading, children }: FeatureProps) => {
    return (
        <Box className="feature">
            <img width="18" src={ChechmarkBlack} alt="Feature" />
            <Typography component="span">{isLoading ? <Skeleton width={50} /> : children}</Typography>
        </Box>
    )
}
