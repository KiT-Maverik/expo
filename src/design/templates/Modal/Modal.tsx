import { ReactNode, useMemo } from 'react'
import {
	Box,
	BoxProps,
	Modal as MUIModal,
	Stack,
	IconButton,
	Typography,
	TypographyProps,
	ModalProps as MuiModalProps,
	StackProps,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import style from './Modal.styles.ts'
import { ModalWidth, testId, modalWidthParams } from './Modal.constants'

export type ModalLayout = 'window' | 'fullscreen'

/** Props for the Modal component. */
interface ModalProps extends Omit<MuiModalProps, 'children' | 'width'> {
	/** The content to be rendered inside the modal. */
	children: ReactNode
	/** Callback fired when the component requests to be closed. */
	onClose(): void
	/** Whether to show modal full width */
	layout?: ModalLayout
	width?: ModalWidth
	ContentProps: StackProps
}

/**
 * A customizable modal component.
 */
export const Modal = ({ children, layout = 'window', onClose, width = 'md', ContentProps }: ModalProps) => {
	return (
		<MUIModal open sx={style.overlay[layout]} onClose={onClose}>
			<Stack
				maxWidth={modalWidthParams[width]}
				sx={style.modal.layout[layout]}
				data-testid={testId.container}
				{...ContentProps}
			>
				{children}
			</Stack>
		</MUIModal>
	)
}

interface ModalHeaderProps extends BoxProps {
	/**
	 * The title to be displayed in the modal header.
	 * Be advised: it overrides Headers' children.
	 * */
	title?: string
	nodeTitle?: boolean
	/** Determines whether the close button should be displayed. */
	onClose?: () => void

	titleProps?: TypographyProps
}

/**
 * Represents the header section of the Modal.
 */
const Header = (props: ModalHeaderProps) => {
	const { title, nodeTitle, children, onClose, titleProps, ...rest } = props

	const content = useMemo(() => {
		if (title)
			return (
				<Typography variant="h5" flexGrow={1} {...titleProps} data-testid={testId.header.title}>
					{title}
				</Typography>
			)
		if (children) return children
		return null
	}, [children, title])

	const closeButton = useMemo(() => {
		if (!onClose) return null

		return (
			<IconButton data-testid={testId.header.closeButton} onClick={onClose}>
				<CloseIcon />
			</IconButton>
		)
	}, [onClose])

	return (
		<Box sx={style.modal.header(!!title, !!nodeTitle)} {...rest} data-testid={testId.header.container}>
			{content}
			{closeButton}
		</Box>
	)
}

/**
 * Represents the body section of the Modal.
 */
const Body = (props: BoxProps) => {
	return (
		<Box sx={style.modal.body} {...props} data-testid={testId.body.container}>
			{props.children}
		</Box>
	)
}

/**
 * Represents the actions section of the Modal.
 */
const Actions = (props: BoxProps) => {
	if (!props.children) return null

	return (
		<Box sx={style.modal.actions} {...props} data-testid={testId.actions.container}>
			{props.children}
		</Box>
	)
}

// Assigning components to Modal for easy access
Modal.Header = Header
Modal.Body = Body
Modal.Actions = Actions
