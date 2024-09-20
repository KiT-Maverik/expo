import Box from '@mui/material/Box'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'
import { testName, testSuite } from 'variables/test.variables'
import { testId } from './Modal.constants'
import { Modal } from './index'

const sampleTestId = 'sample__test-id'
const sampleContent = 'sample__test-id'
const sampleElement = <Box data-testid={sampleTestId}>{sampleContent}</Box>

describe(testSuite.element.template, () => {
	describe('Modal', () => {
		describe(testSuite.healthCheck, () => {
			it(testName.renderIsOk, () => {
				const mockOnClose = jest.fn()
				const { queryByTestId } = render(
					<MemoryRouter initialEntries={['/']}>
						<Modal open={true} onClose={mockOnClose}>
							<Modal.Header title={sampleContent} />
							<Modal.Body>{sampleElement}</Modal.Body>
							<Modal.Actions>{sampleElement}</Modal.Actions>
						</Modal>
					</MemoryRouter>,
				)

				expect(queryByTestId(testId.container)).toBeInTheDocument()
				expect(queryByTestId(testId.header.container)).toBeInTheDocument()
				expect(queryByTestId(testId.body.container)).toBeInTheDocument()
				expect(queryByTestId(testId.actions.container)).toBeInTheDocument()
			})
		})

		describe('Header', () => {
			it('handles title prop correctly', () => {
				const { queryByTestId } = render(<Modal.Header title={sampleContent} />)

				expect(queryByTestId(testId.header.title)).toHaveTextContent(sampleContent)
			})

			it('handles children prop correctly', () => {
				const { queryByTestId } = render(<Modal.Header>{sampleElement}</Modal.Header>)

				expect(queryByTestId(testId.header.title)).toBeNull()
				expect(queryByTestId(sampleTestId)).toHaveTextContent(sampleContent)
			})

			it('renders close button when onClose prop is provided', () => {
				const mockOnClose = jest.fn()
				const { queryByTestId } = render(<Modal.Header title={sampleContent} onClose={mockOnClose} />)

				expect(queryByTestId(testId.header.closeButton)).toBeInTheDocument()
			})

			it('trigger onClose when close button is clicked', () => {
				const mockOnClose = jest.fn()
				const { queryByTestId } = render(<Modal.Header title={sampleContent} onClose={mockOnClose} />)

				fireEvent.click(queryByTestId(testId.header.closeButton)!)
				expect(mockOnClose).toHaveBeenCalled()
			})

			it('does not render close button when onClose prop is not provided', () => {
				const { queryByTestId } = render(<Modal.Header />)

				expect(queryByTestId(testId.header.closeButton)).toBeNull()
			})
		})

		describe('Actions', () => {
			it('should render children', () => {
				const { queryByTestId } = render(<Modal.Actions>{sampleElement}</Modal.Actions>)

				expect(queryByTestId(sampleTestId)).toBeInTheDocument()
			})

			it('returns null when no children are passed', () => {
				const { queryByTestId } = render(<Modal.Actions />)

				expect(queryByTestId(testId.actions.container)).toBeNull()
			})
		})
	})
})
