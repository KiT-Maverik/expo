interface Route {
	href: string
	title: string
}

export enum ROOT_ROUTES {
	HOME = 'home',
}

export enum HOOK_ROUTES {
	PASSWORD_VALIDATOR = 'passwordValidator',
}

const root: { [key in ROOT_ROUTES]: Route } = {
	[ROOT_ROUTES.HOME]: { href: '/', title: 'Home' },
}

const hooks: { [key in HOOK_ROUTES]: Route } = {
	[HOOK_ROUTES.PASSWORD_VALIDATOR]: { href: '/password-validator', title: 'Password Validator' },
}

export const route = {
	...root,
	hooks,
} as const
