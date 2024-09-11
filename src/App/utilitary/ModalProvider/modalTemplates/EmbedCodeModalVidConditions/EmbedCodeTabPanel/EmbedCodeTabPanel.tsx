import { ReactNode } from 'react'
import { Box } from '@mui/material'

interface EmbedCodeTabPanelProps {
    children?: ReactNode
    index: number
    value: number
}

const EmbedCodeTabPanel = (props: EmbedCodeTabPanelProps) => {
    const { children, value, index, ...rest } = props

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            className="TabPanel"
            id={`embed-code-panel-${index}`}
            aria-labelledby={`embed-code-${index}`}
            {...rest}
        >
            {value === index && <Box>{children}</Box>}
        </Box>
    )
}

export default EmbedCodeTabPanel
