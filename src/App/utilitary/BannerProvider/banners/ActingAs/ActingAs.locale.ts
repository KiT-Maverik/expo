export default {
    title: (clientName: string) => `You’re currently acting as ${clientName || 'an agency'}`,
    message: (clientName: string) =>
        `You’re currently acting as ${
            clientName || 'an agency'
        }. To change clients, select a new one from the dropdown.`,
    action: 'Back to agency',
    placeholder: 'Select client',
}
