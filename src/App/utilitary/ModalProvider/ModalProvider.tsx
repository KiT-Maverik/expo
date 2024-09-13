import { useAppSelector } from "App/App.store.ts";
import {
    selectModalControllerState,
    CancelAccountModal,
} from 'design/templates/Modal'

export const ModalProvider = () => {
    const { type } = useAppSelector(selectModalControllerState)

    switch (type) {
        case 'Cancel account':
            return <CancelAccountModal />
    }

    return null
}
