import { Modal, closeModal, ModalControllerState, selectModalControllerState, UserId } from 'design/templates/Modal'
import { Button, Radio, FormControlLabel, RadioGroup, Stack, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'App'
import { ChangeEvent, useCallback, useState } from 'react'
import { useToast } from 'design/organisms/ToastProvider'
import { useCancelAccountMutation, useRemoveClientAccountMutation } from 'api/mutations'
import LoadingButton from '@mui/lab/LoadingButton'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Tooltip from '@mui/material/Tooltip'
import { useApiErrorToast } from 'api/hooks'
import locale from './RemoveClientModal.locale'

type Operation = 'Remove client' | 'Cancel account'

export const RemoveClientModal = () => {
    const dispatch = useAppDispatch()
    const { showToast } = useToast()
    const { showApiErrorToast } = useApiErrorToast()
    const { cancelAccount } = useCancelAccountMutation()
    const { removeClientAccount } = useRemoveClientAccountMutation()
    const [operation, setOperation] = useState<Operation>('Cancel account')
    const { type, props } = useAppSelector(selectModalControllerState) as ModalControllerState<UserId>

    const handleClose = useCallback(() => {
        dispatch(closeModal())
    }, [])

    const handleSubmit = useCallback(async () => {
        if (operation === 'Cancel account')
            await cancelAccount.mutateAsync(props.id, {
                onSuccess: () => {
                    showToast({
                        type: 'info',
                        title: locale.notification.cancelAccount.title,
                        message: locale.notification.cancelAccount.message,
                    })
                    dispatch(closeModal())
                },
                onError: (error) => showApiErrorToast(error),
            })
        else if (operation === 'Remove client')
            await removeClientAccount.mutateAsync(props.id, {
                onSuccess: () => {
                    showToast({
                        type: 'info',
                        title: locale.notification.removeAccount.title,
                        message: locale.notification.removeAccount.message,
                    })
                    dispatch(closeModal())
                },
                onError: (error) => showApiErrorToast(error),
            })
        else {
            showToast({
                message: locale.notification.error,
                type: 'error',
            })
        }
    }, [operation, props])

    return (
        <Modal open={type === 'Remove client'} onClose={handleClose}>
            <Modal.Header title={locale.title} onClose={handleClose} />
            <Modal.Body>
                <RadioGroup
                    value={operation}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setOperation(event.target.value as Operation)}
                >
                    <Stack direction="row" gap={9}>
                        <FormControlLabel
                            value="Cancel account"
                            label={
                                <Stack direction="row" gap={3}>
                                    <Typography>Cancel account</Typography>
                                    <Tooltip placement="top" arrow title={locale.hint.cancel}>
                                        <InfoOutlinedIcon sx={{ fill: (theme) => theme.palette.text.disabled }} />
                                    </Tooltip>
                                </Stack>
                            }
                            control={<Radio />}
                        />
                        <FormControlLabel
                            value="Remove client"
                            label={
                                <Stack direction="row" gap={3}>
                                    <Typography>Remove client</Typography>
                                    <Tooltip placement="top" arrow title={locale.hint.remove}>
                                        <InfoOutlinedIcon sx={{ fill: (theme) => theme.palette.text.disabled }} />
                                    </Tooltip>
                                </Stack>
                            }
                            control={<Radio />}
                        />
                    </Stack>
                </RadioGroup>
            </Modal.Body>
            <Modal.Actions>
                <Button variant="outlined" color="tertiary" onClick={handleClose}>
                    {locale.actions.cancel}
                </Button>
                <LoadingButton
                    loading={cancelAccount.isLoading || removeClientAccount.isLoading}
                    variant="contained"
                    color="error"
                    onClick={handleSubmit}
                >
                    {locale.actions.confirm}
                </LoadingButton>
            </Modal.Actions>
        </Modal>
    )
}
