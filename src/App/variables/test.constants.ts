/**
 * This object holds the standardized test suites names to maintain uniformity across the application.
 * It includes only global test suite names, which are reusable across multiple test files.
 */
export const testSuite = {
	contractValidation: 'Contract validation',
	healthCheck: 'Health check',
	integration: 'Integration',
	element: {
		atoms: 'Atom',
		molecule: 'Molecule',
		organism: 'Organism',
		template: 'Template',
		page: 'Page',
	},
	entity: {
		hook: 'Hook',
	},
	page: {
		agencyAccount: 'Agency account page',
	},
} as const

/**
 * Common test names used across multiple test suites.
 * Generally used for executing global verifications, like render check.
 */
export const testName = {
	renderIsOk: 'Render is OK',
	smoke: 'Smoke test',
} as const
