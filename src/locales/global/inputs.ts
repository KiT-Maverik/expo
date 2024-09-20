import { LANGUAGE } from 'App'

const en = {
	creditCard: {
		number: {
			label: 'Card Number',
			placeholder: '**** **** **** ****',
		},
		cvv: {
			label: 'CVV',
			placeholder: '•••',
		},
		expiry: {
			month: {
				label: 'Month',
				placeholder: 'MM',
			},
			year: {
				label: 'Year',
				placeholder: 'YYYY',
			},
		},
	},
	user: {
		email: {
			label: 'Email',
			placeholder: 'Enter your email',
		},
		name: {
			label: 'Name',
			placeholder: 'Enter your name',
		},
		firstName: {
			label: 'First Name',
			placeholder: 'Enter your name',
		},
		lastName: {
			label: 'Last Name',
			placeholder: 'Enter your last name',
		},
		password: {
			label: 'Password',
			placeholder: 'Enter your password',
		},
		newPassword: {
			label: 'New Password',
			placeholder: 'Enter your new password',
		},
		confirmPassword: {
			label: 'Confirm Password',
			placeholder: 'Enter your password confirmation',
		},
	},
	address: {
		zip: {
			label: 'ZIP Code',
			placeholder: '#####',
		},
	},
	common: {
		placeholder: 'Type here...',
	},
}

export type InputsLocale = typeof en

const ua: InputsLocale = {
	creditCard: {
		number: {
			label: 'Номер картки',
			placeholder: '**** **** **** ****',
		},
		cvv: {
			label: 'CVV',
			placeholder: '•••',
		},
		expiry: {
			month: {
				label: 'Місяць',
				placeholder: 'ММ',
			},
			year: {
				label: 'Рік',
				placeholder: 'РРРР',
			},
		},
	},
	user: {
		email: {
			label: 'Електронна пошта',
			placeholder: 'Введіть вашу електронну пошту',
		},
		name: {
			label: "Ім'я",
			placeholder: "Введіть ваше ім'я",
		},
		firstName: {
			label: "Ім'я",
			placeholder: "Введіть ваше ім'я",
		},
		lastName: {
			label: 'Прізвище',
			placeholder: 'Введіть ваше прізвище',
		},
		password: {
			label: 'Пароль',
			placeholder: 'Введіть ваш пароль',
		},
		newPassword: {
			label: 'Новий пароль',
			placeholder: 'Введіть ваш новий пароль',
		},
		confirmPassword: {
			label: 'Підтвердження паролю',
			placeholder: 'Введіть підтвердження паролю',
		},
	},
	address: {
		zip: {
			label: 'Поштовий індекс',
			placeholder: '#####',
		},
	},
	common: {
		placeholder: 'Введіть тут...',
	},
}

export const inputs: { [key in LANGUAGE]: InputsLocale } = { en, ua }
