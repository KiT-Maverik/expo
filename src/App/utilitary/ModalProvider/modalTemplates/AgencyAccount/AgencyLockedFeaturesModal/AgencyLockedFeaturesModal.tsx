import { Typography, Button } from '@mui/material'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'App'
import { Link } from 'design/atoms/Link'
import { closeModal, selectModalControllerState, Modal, ModalControllerState } from 'design/templates/Modal'
import { OPEN_CREATE_CLIENT_MODAL } from 'design/pages/AgencyAccount/AgencyAccount'
import { route } from 'constants/routes'
import { HELP_MAIL } from 'constants/brand.constants'

import locale from './AgencyLockedFeaturesModal.locale'

export type AgencyLockedFeaturesModalProps = { fallback?: boolean }

export const AgencyLockedFeaturesModal = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { type, props } = useAppSelector(
        selectModalControllerState,
    ) as ModalControllerState<AgencyLockedFeaturesModalProps>

    const handleClose = useCallback(() => {
        dispatch(closeModal())

        if (props.fallback) navigate(-1)
    }, [])

    const handleCreateAccount = useCallback(() => {
        navigate(route.agency.dashboard, { state: { [OPEN_CREATE_CLIENT_MODAL]: true } })
    }, [])

    return (
        <Modal open={type === 'Agency locked features'} onClose={handleClose} width="lg">
            <Modal.Header title={locale.title} onClose={handleClose} />
            <Modal.Body display="flex" gap={3} flexDirection="column">
                <Typography>{locale.message}</Typography>
                <Typography>
                    {locale.cta}{' '}
                    <Link to={route.mail.hi} target="_blank">
                        {HELP_MAIL}
                    </Link>
                </Typography>
            </Modal.Body>
            <Modal.Actions>
                <Button variant="contained" onClick={handleCreateAccount}>
                    {locale.actions.create}
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
