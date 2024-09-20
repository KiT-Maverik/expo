import HomeIcon from '@mui/icons-material/HomeRounded'
import PasswordValidatorIcon from '@mui/icons-material/PasswordRounded'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { HOOK_ROUTES, route } from 'App'

const icons: { [key in HOOK_ROUTES]: ReactNode } = {
	passwordValidator: <PasswordValidatorIcon />,
}

export const Navigation = () => {
	const navigate = useNavigate()

	return (
		<List>
			<ListItem disablePadding onClick={() => navigate(route.home.href)}>
				<ListItemButton>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary={route.home.title} />
				</ListItemButton>
			</ListItem>
			<Divider />
			{Object.values(HOOK_ROUTES).map((hook) => (
				<ListItem key={hook} disablePadding onClick={() => navigate(route.hooks[hook].href)}>
					<ListItemButton>
						<ListItemIcon>{icons[hook]}</ListItemIcon>
						<ListItemText primary={route.hooks[hook].title} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	)
}
