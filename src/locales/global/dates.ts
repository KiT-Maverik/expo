import { LANGUAGE } from 'App'

const en = {
    weekday: [
		{ abbreviation: 'Mon', name: 'Monday' },
		{ abbreviation: 'Tue', name: 'Tuesday' },
		{ abbreviation: 'Wed', name: 'Wednesday' },
		{ abbreviation: 'Thu', name: 'Thursday' },
		{ abbreviation: 'Fri', name: 'Friday' },
		{ abbreviation: 'Sat', name: 'Saturday' },
		{ abbreviation: 'Sun', name: 'Sunday' },
    ],
    month: [
		{ abbreviation: 'Jan', name: 'January' },
		{ abbreviation: 'Feb', name: 'February' },
		{ abbreviation: 'Mar', name: 'March' },
		{ abbreviation: 'Apr', name: 'April' },
		{ abbreviation: 'May', name: 'May' },
		{ abbreviation: 'Jun', name: 'June' },
		{ abbreviation: 'Jul', name: 'July' },
		{ abbreviation: 'Aug', name: 'August' },
		{ abbreviation: 'Sep', name: 'September' },
		{ abbreviation: 'Oct', name: 'October' },
		{ abbreviation: 'Nov', name: 'November' },
		{ abbreviation: 'Dec', name: 'December' },
    ],
}

export type DatesLocale = typeof en

const ua: DatesLocale = {
    weekday: [
		{ abbreviation: 'Пн', name: 'Понеділок' },
		{ abbreviation: 'Вт', name: 'Вівторок' },
		{ abbreviation: 'Ср', name: 'Середа' },
		{ abbreviation: 'Чт', name: 'Четвер' },
		{ abbreviation: 'Пт', name: "П'ятниця" },
		{ abbreviation: 'Сб', name: 'Субота' },
		{ abbreviation: 'Нд', name: 'Неділя' },
    ],
    month: [
		{ abbreviation: 'Січ', name: 'Січень' },
		{ abbreviation: 'Лют', name: 'Лютий' },
		{ abbreviation: 'Бер', name: 'Березень' },
		{ abbreviation: 'Кві', name: 'Квітень' },
		{ abbreviation: 'Тра', name: 'Травень' },
		{ abbreviation: 'Чер', name: 'Червень' },
		{ abbreviation: 'Лип', name: 'Липень' },
		{ abbreviation: 'Сер', name: 'Серпень' },
		{ abbreviation: 'Вер', name: 'Вересень' },
		{ abbreviation: 'Жов', name: 'Жовтень' },
		{ abbreviation: 'Лис', name: 'Листопад' },
		{ abbreviation: 'Гру', name: 'Грудень' },
    ],
}

export const dates: { [key in LANGUAGE]: DatesLocale } = { en, ua }
