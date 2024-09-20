import { createTestId } from 'utils'

export const testId = {
	container: createTestId('modal__container'),
	header: {
		container: createTestId('modal__header__container'),
		title: createTestId('modal__header__title'),
		closeButton: createTestId('modal__header__closeButton'),
	},
	body: {
		container: createTestId('modal__body__container'),
	},
	actions: {
		container: createTestId('modal__actions__container'),
	},
}

export const modalWidthParams = {
	xs: 346,
	sm: 444,
	md: 600,
	lg: 900,
	xl: 1200,
}

export type ModalWidth = keyof typeof modalWidthParams
