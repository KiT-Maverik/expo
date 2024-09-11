import { Box, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'

import { MOCKED_PLAN } from 'design/templates/Modal/modalTemplates/SubscriptionModal/SelectPlanStep/SelectPlanStep.constants'
import { Plan } from 'types/Customer'

type FeaturesProps = {
    plan?: Plan
}

export const Features = ({ plan }: FeaturesProps) => {
    return (
        <Box className="planFeatures">
            <Typography className="planFeaturesTitle">Features</Typography>
            <ul>
                {(plan || MOCKED_PLAN).features.map((feature, i) => (
                    <li key={`${feature}${i}`}>
                        <CheckIcon color={plan?.isFree ? 'tertiary' : 'primary'} />
                        <Box>
                            <Typography component="span">{feature}</Typography>
                        </Box>
                    </li>
                ))}
            </ul>
        </Box>
    )
}
