interface Route {
	href: string
	title: string
}

export enum ROOT_ROUTES {
	HOME = 'home',
}

export enum HOOK_ROUTES {
	COPY_TO_CLIPBOARD = 'copyToClipboard',
	COUNTDOWN = 'countdown',
	LAYOUT_DETECTOR = 'layoutDetector',
	LOGIN = 'login',
	LOGOUT = 'logout',
	PASSWORD_VALIDATOR = 'passwordValidator',
	VIEWPORT_DETECTOR = 'viewportDetector',
}

const root: { [key in ROOT_ROUTES]: Route } = {
	[ROOT_ROUTES.HOME]: { href: '/', title: 'Home' },
}

const hooks: { [key in HOOK_ROUTES]: Route } = {
	[HOOK_ROUTES.COPY_TO_CLIPBOARD]: { href: '/copy-to-clipboard', title: 'Copy to Clipboard' },
	[HOOK_ROUTES.COUNTDOWN]: { href: '/countdown', title: 'Countdown' },
	[HOOK_ROUTES.LAYOUT_DETECTOR]: { href: '/layout-detector', title: 'Layout detector' },
	[HOOK_ROUTES.LOGIN]: { href: '/login', title: 'Login' },
	[HOOK_ROUTES.LOGOUT]: { href: '/logout', title: 'Logout' },
	[HOOK_ROUTES.PASSWORD_VALIDATOR]: { href: '/password-validator', title: 'Password Validator' },
	[HOOK_ROUTES.VIEWPORT_DETECTOR]: { href: '/viewport-detector', title: 'Viewport Detector' },
}

export const route = {
	...root,
	hooks,
} as const
