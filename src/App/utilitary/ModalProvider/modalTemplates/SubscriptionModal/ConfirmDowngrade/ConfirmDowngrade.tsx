import { useState, useMemo } from 'react'
import { format } from 'date-fns'
import { Box, Typography, Button, Grid } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'

import Warning from 'assets/img/freemium/warning-icon.svg'
import { Plan, CustomerSubscriptionPlanTier } from 'types/Customer'
import { useVideosQuery, useCustomerSubscriptionQuery } from 'api/queries'
import { useActivatePlanMutation } from 'api/mutations'
import { SuccessMessage } from '../SuccessMessage'
import { VideosWarning } from '../VideosWarning'

import './index.scss'

type ConfirmDowngradeProps = {
    plan: Plan
    downgradePlan: Plan
    onCancel: () => void
    onClose: () => void
}

export const ConfirmDowngrade = ({ plan, downgradePlan, onCancel, onClose }: ConfirmDowngradeProps) => {
    const { data: videos } = useVideosQuery()
    const [displayWarning, setDisplayWarning] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const { data: subscription, isLoading } = useCustomerSubscriptionQuery()
    const activatePlanMutation = useActivatePlanMutation({ onSuccess: () => setShowSuccessMessage(true) })

    const features = useMemo(() => {
        const arrayHalf = Math.round(plan.features.length / 2)
        return [plan.features.slice(0, arrayHalf), plan.features.slice(arrayHalf)]
    }, [plan])

    const renderFeatures = (features: string[]) => (
        <Grid item tablet={6} mobile={12}>
            {features.map((feature, i) => (
                <Box key={`${feature}${i}`} className="feature">
                    <CheckIcon color="primary" />
                    <Box>
                        <Typography component="span">{feature}</Typography>
                    </Box>
                </Box>
            ))}
        </Grid>
    )

    const handleDowngrade = () => {
        if (downgradePlan.tier === CustomerSubscriptionPlanTier.free && videos && videos.length > 3) {
            return setDisplayWarning(true)
        }

        activatePlanMutation.mutate({ apiHandle: downgradePlan.apiHandle })
    }

    if (showSuccessMessage) {
        return (
            <SuccessMessage
                mainTitle="Your plan has been successfully changed!"
                title="Your New Plan"
                description={`Your new subscription wil take effect on ${
                    isLoading || !subscription?.dateNextBilling
                        ? '**/**/****'
                        : format(new Date(subscription?.dateNextBilling || 0), 'MM/dd/yyyy')
                }, on your next renewal date.`}
                onClose={onClose}
            />
        )
    }

    if (displayWarning) {
        return <VideosWarning onCancel={onCancel} onClose={onClose} />
    }

    return (
        <Box className="ConfirmDowngrade">
            <Box className="warning">
                <img src={Warning} alt="warning" />
            </Box>
            <Typography className="mainTitle">Are you sure you want to downgrade?</Typography>
            <Typography className="title">You’ll be missing all these features:</Typography>
            <Grid container spacing={2} className="features">
                {renderFeatures(features[0])}
                {renderFeatures(features[1])}
            </Grid>
            <Box className="buttonsContainer">
                <Button variant="contained" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="outlined" onClick={handleDowngrade} disabled={!videos}>
                    Yes, downgrade
                </Button>
            </Box>
        </Box>
    )
}
