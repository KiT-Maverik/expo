import { ReactNode } from 'react'
import { Box } from '@mui/material'

interface TabPanelProps {
    children?: ReactNode
    index: number
    value: number
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            className="TabPanel"
            id={`embed-code-panel-${index}`}
            aria-labelledby={`embed-code-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </Box>
    )
}

export default TabPanel
