import CopyIcon from '@mui/icons-material/ContentCopyRounded'
import HomeIcon from '@mui/icons-material/HomeRounded'
import CountdownIcon from '@mui/icons-material/HourglassBottomRounded'
import LoginIcon from '@mui/icons-material/LoginRounded'
import LogoutIcon from '@mui/icons-material/LogoutRounded'
import LayoutDetectorIcon from '@mui/icons-material/ViewCozyRounded'
import PasswordValidatorIcon from '@mui/icons-material/PasswordRounded'
import ViewportDetectorIcon from '@mui/icons-material/ScreenshotMonitorRounded'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { HOOK_ROUTES, route } from 'App/variables/routes.contants.ts'

const icons: { [key in HOOK_ROUTES]: ReactNode } = {
	[HOOK_ROUTES.COPY_TO_CLIPBOARD]: <CopyIcon />,
	[HOOK_ROUTES.COUNTDOWN]: <CountdownIcon />,
	[HOOK_ROUTES.LAYOUT_DETECTOR]: <LayoutDetectorIcon />,
	[HOOK_ROUTES.LOGIN]: <LoginIcon />,
	[HOOK_ROUTES.LOGOUT]: <LogoutIcon />,
	[HOOK_ROUTES.PASSWORD_VALIDATOR]: <PasswordValidatorIcon />,
	[HOOK_ROUTES.VIEWPORT_DETECTOR]: <ViewportDetectorIcon />,
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
