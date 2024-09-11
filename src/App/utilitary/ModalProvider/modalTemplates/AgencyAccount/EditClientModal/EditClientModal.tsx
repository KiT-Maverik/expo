import { Stack, TextField, Typography, Box, Button, Fade, FormHelperText } from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import LoadingButton from '@mui/lab/LoadingButton'
import { useFormik } from 'formik'
import { useCallback, useState } from 'react'
import z from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

import { useAppDispatch, useAppSelector } from 'App'
import { avatar } from 'api/contracts/agency/entities/common'
import { useToast } from 'design/organisms/ToastProvider'
import { Modal, closeModal, ModalControllerState, selectModalControllerState } from 'design/templates/Modal'
import { AgencyClient, agencyClient } from 'api/contracts/agency/entities/agencyClient'
import { useUpdateAgencyClientMutation } from 'api/mutations/agency/useUpdateAgencyClientMutation'

import style from './EditClientModal.styles'
import locale from './EditClientModal.locale'

export type EditClientModalProps = Pick<AgencyClient, 'id' | 'name' | 'picture'>

export const EditClientModal = () => {
    const dispatch = useAppDispatch()
    const { showToast } = useToast()
    const { type, props } = useAppSelector(selectModalControllerState) as ModalControllerState<EditClientModalProps>
    const { id, name, picture } = props
    const { updateAgencyClient, isLoading } = useUpdateAgencyClientMutation(id)
    const [showHint, setShowHint] = useState(false)

    const { handleSubmit, setFieldValue, submitForm, values, errors, touched, handleChange, handleBlur } = useFormik({
        validationSchema: toFormikValidationSchema(
            agencyClient.pick({ name: true }).merge(z.object({ picture: avatar })),
        ),
        initialValues: { name, picture },
        onSubmit: (v) => {
            updateAgencyClient(v, {
                onSuccess: () => {
                    showToast({
                        message: locale.notification.clientUpdated,
                        type: 'success',
                    })
                    handleClose()
                },
            })
        },
    })

    const handleClose = useCallback(() => {
        dispatch(closeModal())
    }, [])

    if (!id || !name) {
        showToast({
            message: locale.notification.error,
            type: 'error',
        })

        handleClose()

        return <></>
    }

    return (
        <Modal open={type === 'Edit user'} onClose={handleClose}>
            <Modal.Header title={locale.title} onClose={handleClose} />
            <Modal.Body>
                <Stack component="form" onSubmit={handleSubmit} gap={4}>
                    <Typography color="text.secondary">{locale.hint(name)}</Typography>
                    <TextField
                        fullWidth
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                    />
                    <Typography variant="subtitle2">{locale.avatarTitle(!!picture)}</Typography>
                    <Stack direction="row" gap={4}>
                        <Box
                            onMouseEnter={() => picture && setShowHint(true)}
                            onMouseLeave={() => picture && setShowHint(false)}
                            sx={[
                                style.avatar.container,
                                picture ? { backgroundImage: `url(${picture})` } : {},
                                showHint ? style.avatar.overlay : {},
                            ]}
                        >
                            <Box
                                component="input"
                                type="file"
                                name="picture"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.currentTarget.files) {
                                        setFieldValue('picture', e.currentTarget.files[0])
                                        showToast({
                                            message: locale.notification.avatarUpdated,
                                            type: 'success',
                                        })
                                    }
                                }}
                                onBlur={handleBlur}
                                sx={style.avatar.input}
                            />
                            <Fade in={!picture || showHint} mountOnEnter unmountOnExit>
                                <Box sx={style.avatar.overlay}>
                                    <AddAPhotoIcon color="secondary" />
                                </Box>
                            </Fade>
                        </Box>
                        <FormHelperText error>{errors.picture}</FormHelperText>
                    </Stack>
                </Stack>
            </Modal.Body>
            <Modal.Actions>
                <Button disabled={isLoading} variant="outlined" color="tertiary" onClick={handleClose}>
                    {locale.action.cancel}
                </Button>
                <LoadingButton loading={isLoading} variant="contained" color="primary" onClick={submitForm}>
                    {locale.action.confirm}
                </LoadingButton>
            </Modal.Actions>
        </Modal>
    )
}

// TODO: [VID-7845] Handle avatar size
// TODO: [VID-7846] Handle avatar update on change
