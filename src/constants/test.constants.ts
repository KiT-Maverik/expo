/**
 * This object holds the standardized test suites names to maintain uniformity across the application.
 * It includes only generic test suite names, which are reusable across multiple test files.
 */
export const testSuite = {
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
}

/**
 * Common test names used across multiple test suites.
 * Generally used for executing generic verifications, like render check.
 */
export const testName = {
    renderIsOk: 'Render is OK',
    smoke: 'Smoke test',
}
