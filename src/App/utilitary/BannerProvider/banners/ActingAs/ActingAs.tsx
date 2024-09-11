import { Alert, Autocomplete, Button, TextField } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from 'App'
import { AgencyClient } from 'api/contracts/agency/entities/agencyClient'
import { useGetAgencyClientsQuery } from 'api/queries'
import { selectAccount } from 'design/pages/AccountSettings/account.slice'
import { useClientAccount } from 'design/pages/AgencyAccount/AgencyAccount.hooks'
import { route } from 'constants/routes'

import locale from './ActingAs.locale'

type CurrentClient = Pick<AgencyClient, 'id' | 'name'>

const defaultClient: CurrentClient = {
    id: -1,
    name: '',
}

export const ActingAs = () => {
    const navigate = useNavigate()
    const { jumpIn } = useClientAccount()
    const { agencyClients } = useGetAgencyClientsQuery()
    const [currentClient, setCurrentClient] = useState<CurrentClient>(defaultClient)
    const { managedClientId } = useAppSelector(selectAccount)

    useEffect(() => {
        const result = agencyClients.find((client) => client.id === managedClientId)
        setCurrentClient(result ? { id: result.id, name: result.name } : defaultClient)
    }, [agencyClients, managedClientId])

    return (
        <Alert
            severity="info"
            variant="standard"
            isBanner
            action={
                <>
                    <Autocomplete
                        disablePortal
                        options={agencyClients
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .filter(({ id, status }) => status !== 'pending' && id !== currentClient.id)
                            .map((client) => ({ label: client.name, id: client.id }))}
                        value={{ label: currentClient.name, id: currentClient.id }}
                        onChange={(_, value) => {
                            value?.id && jumpIn(value?.id)
                        }}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} placeholder={locale.placeholder} />}
                    />
                    <Button
                        variant="outlined"
                        color="tertiary"
                        startIcon={<ArrowBackRoundedIcon />}
                        onClick={() => navigate(route.agency.dashboard)}
                    >
                        {locale.action}
                    </Button>
                </>
            }
        >
            {locale.message(currentClient.name)}
        </Alert>
    )
}
