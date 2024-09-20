import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

/**
 * This util enables sx prop to handle conditional styles.
 */
export const normalizeSxProps = (stylesList: Array<SxProps<Theme> | false | undefined>): SxProps<Theme> => {
	return stylesList.filter((style) => style !== false && style !== undefined) as SxProps<Theme>
}
