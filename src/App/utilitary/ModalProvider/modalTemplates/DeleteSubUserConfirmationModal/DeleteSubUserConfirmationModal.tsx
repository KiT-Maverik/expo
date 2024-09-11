import { useCallback } from 'react'
import { Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { Modal } from 'design/templates/Modal'
import { DeleteSubUserConfirmationProps, ModalDefaultProps } from 'design/templates/Modal/ModalTypes/types'
import { useDeleteSubUserMutation } from 'api/mutations'
import { APPCUES_EVENTS, trackAppCuesEvent } from 'thirdPartyServices/appCues'

import locale from './DeleteSubUserConfirmationModal.locale'

type DeleteSubUserConfirmationModalProps = DeleteSubUserConfirmationProps & ModalDefaultProps

export const DeleteSubUserConfirmationModal = ({ subUsers, onClose }: DeleteSubUserConfirmationModalProps) => {
    const { mutateAsync, isLoading } = useDeleteSubUserMutation()

    const multiple = Array.isArray(subUsers) && subUsers?.length > 1

    const handleDelete = useCallback(async () => {
        if (!Array.isArray(subUsers) && subUsers?.id) {
            await mutateAsync(subUsers?.id)
            trackAppCuesEvent(APPCUES_EVENTS.SUB_USER_REMOVED)
        } else if (multiple) {
            await Promise.all(
                subUsers.map(async (user) => {
                    trackAppCuesEvent(APPCUES_EVENTS.SUB_USER_REMOVED)
                    return await mutateAsync(user.id)
                }),
            )
        }

        onClose()
    }, [subUsers])

    return (
        <Modal open onClose={onClose} width="md">
            <Modal.Header onClose={onClose}>
                <Stack width={1}>
                    <Typography variant="h5">{multiple ? locale.titleMultiple : locale.title}</Typography>
                </Stack>
            </Modal.Header>
            <Modal.Body>{locale.description}</Modal.Body>
            <Modal.Actions>
                <LoadingButton onClick={onClose} loading={isLoading} variant="outlined">
                    {locale.close}
                </LoadingButton>
                <LoadingButton onClick={handleDelete} loading={isLoading} variant="contained" color="error">
                    {locale.confirm}
                </LoadingButton>
            </Modal.Actions>
        </Modal>
    )
}

export default DeleteSubUserConfirmationModal
