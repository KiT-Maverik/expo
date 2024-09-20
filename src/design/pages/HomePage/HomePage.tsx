import { Content } from 'design/templates'

import { route } from 'App'

import style from './HomePage.styles'

export const HomePage = () => {
	return <Content title={route.home.title}>homepage</Content>
}
