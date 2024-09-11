import { useCallback, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'App'
import { useFormik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Box, Divider, Stack, TextField, Tooltip, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

import {
    createAgencyClientContract,
    type CreateAgencyClientRequest as Values,
} from 'api/contracts/agency/endpoints/createAgencyClient.contract'
import { useCreateClientMutation, useValidateAgencyClientMutation } from 'api/mutations'
import { useApiErrorToast } from 'api/hooks'
import { closeModal, Modal, selectModalControllerState } from 'design/templates/Modal'
import { PlanCard, PlanCardPlans } from 'design/organisms/PlanCard/PlanCard'
import { ApiHandle } from 'types/Customer'
import { Link } from 'design/atoms/Link'
import { route } from 'constants/routes'

import { Congratulations } from './Congratulations/Congratulations'
import locale from './CreateClientModal.locale'

export type CreateClientStage = 'Creation' | 'Choosing plan' | 'Completion'

export const CreateClientModal = () => {
    const dispatch = useAppDispatch()
    const { type } = useAppSelector(selectModalControllerState)
    const { showApiErrorToast } = useApiErrorToast()
    const { palette } = useTheme()
    const { validateAgencyClient } = useValidateAgencyClientMutation()
    const { createClient } = useCreateClientMutation()

    const [stage, setStage] = useState<CreateClientStage>('Creation')
    const [currentPlan, setCurrentPlan] = useState<PlanCardPlans>(ApiHandle.ProNc)
    const [inviteLink, setInviteLink] = useState('')

    const { handleSubmit, submitForm, handleChange, handleBlur, values, touched, errors } = useFormik<Values>({
        validationSchema: toFormikValidationSchema(createAgencyClientContract.request.body),
        initialValues: {
            name: '',
            email: '',
        },
        onSubmit: async ({ email, name }) => {
            await validateAgencyClient.mutateAsync(
                { email },
                {
                    onSuccess: async ({ customerExists }) => {
                        if (customerExists) {
                            await createClient.mutateAsync(
                                { email, name },
                                {
                                    onSuccess: ({ invitationUrl }) => {
                                        setStage('Completion')
                                        setInviteLink(invitationUrl)
                                    },
                                    onError: (error) => showApiErrorToast(error),
                                },
                            )
                        } else {
                            setStage('Choosing plan')
                        }
                    },
                },
            )
        },
    })

    const handleClose = useCallback(() => {
        dispatch(closeModal())
    }, [])

    const header = useMemo(() => {
        if (stage === 'Creation') return locale.createClientForm.header
        if (stage === 'Choosing plan') return locale.choosePlanForm.header
    }, [stage])

    const createClientForm = useMemo(() => {
        if (stage !== 'Creation') return null

        return (
            <Modal.Body sx={{ display: 'flex', flexDirection: 'column', gap: 10, flexGrow: 1 }}>
                <Typography color="text.secondary">{locale.createClientForm.message}</Typography>
                <Divider />

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack direction="row" gap={3} alignItems="center" mb={4}>
                        <Stack direction="row" gap={3} width="20%" minWidth={100}>
                            <Typography>{locale.createClientForm.input.name.label}</Typography>
                            <Tooltip title={locale.createClientForm.input.name.tooltip}>
                                <InfoOutlinedIcon style={{ fill: palette.action.active }} />
                            </Tooltip>
                        </Stack>
                        <TextField
                            name="name"
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={touched.name && !!errors.name}
                            helperText={touched.name && errors.name}
                            placeholder={locale.createClientForm.input.name.placeholder}
                        />
                    </Stack>
                    <Stack direction="row" gap={3} alignItems="center">
                        <Typography width="20%" minWidth={100}>
                            {locale.createClientForm.input.email.label}
                        </Typography>
                        <TextField
                            name="email"
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            error={touched.email && !!errors.email}
                            helperText={touched.email && errors.email}
                            placeholder={locale.createClientForm.input.email.placeholder}
                        />
                    </Stack>
                </Box>
            </Modal.Body>
        )
    }, [stage, values.name, touched.name, errors.name, values.email, touched.email, errors.email])

    const choosePlanForm = useMemo(() => {
        if (stage !== 'Choosing plan') return null

        return (
            <Modal.Body sx={{ display: 'flex', flexDirection: 'column', gap: 10, flexGrow: 1 }}>
                <Stack direction="row" gap={4} m="0 auto" width={1}>
                    <PlanCard
                        plan={ApiHandle.Free}
                        highlight={currentPlan === ApiHandle.Free}
                        onClick={() => setCurrentPlan(ApiHandle.Free)}
                    />
                    <PlanCard
                        plan={ApiHandle.ProNc}
                        label="Most popular"
                        highlight={currentPlan === ApiHandle.ProNc}
                        onClick={() => setCurrentPlan(ApiHandle.ProNc)}
                    />
                    <PlanCard
                        plan={ApiHandle.PremiumNc}
                        highlight={currentPlan === ApiHandle.PremiumNc}
                        onClick={() => setCurrentPlan(ApiHandle.PremiumNc)}
                    />
                </Stack>
                <Typography variant="caption2" textAlign="center">
                    {locale.choosePlanForm.contactUs.needMoreInfo}
                    <Link to={route.static.contacts} target="_blank">
                        {' '}
                        {locale.choosePlanForm.contactUs.getInTouch}{' '}
                    </Link>
                    {locale.choosePlanForm.contactUs.weTailor}
                </Typography>
            </Modal.Body>
        )
    }, [stage, currentPlan])

    const actions = useMemo(() => {
        if (stage === 'Completion') return

        if (stage === 'Creation') {
            return (
                <Modal.Actions>
                    <Button variant="outlined" color="tertiary" onClick={handleClose}>
                        {locale.createClientForm.action.cancel}
                    </Button>
                    <LoadingButton
                        color="primary"
                        variant="contained"
                        onClick={submitForm}
                        disabled={createClient.isLoading || validateAgencyClient.isLoading}
                        loading={createClient.isLoading || validateAgencyClient.isLoading}
                    >
                        {locale.createClientForm.action.create}
                    </LoadingButton>
                </Modal.Actions>
            )
        }

        if (stage === 'Choosing plan') {
            return (
                <Modal.Actions>
                    <Button variant="outlined" color="tertiary" onClick={() => setStage('Creation')}>
                        {locale.choosePlanForm.action.back}
                    </Button>
                    <LoadingButton
                        color="primary"
                        variant="contained"
                        onClick={async () => {
                            await createClient.mutateAsync(
                                { ...values, apiHandle: currentPlan },
                                {
                                    onSuccess: ({ invitationUrl }) => {
                                        setStage('Completion')
                                        setInviteLink(invitationUrl)
                                    },
                                },
                            )
                        }}
                        disabled={createClient.isLoading}
                        loading={createClient.isLoading}
                    >
                        {currentPlan === 'free-2021'
                            ? locale.choosePlanForm.action.sendInvitation
                            : locale.choosePlanForm.action.startTrial}
                    </LoadingButton>
                </Modal.Actions>
            )
        }
    }, [stage, currentPlan, createClient.isLoading, validateAgencyClient.isLoading])

    return (
        <Modal
            open={type === 'Create agency client modal'}
            onClose={handleClose}
            stackProps={{ sx: { minHeight: 600, width: 1 } }}
            width="lg"
        >
            <Modal.Header
                title={header}
                titleProps={{ textAlign: stage === 'Choosing plan' ? 'center' : 'initial' }}
                onClose={handleClose}
            />
            {createClientForm}
            {choosePlanForm}
            <Congratulations link={inviteLink} show={stage === 'Completion'} />
            {actions}
        </Modal>
    )
}
