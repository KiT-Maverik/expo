export default {
    title: (isMultipleSelected: boolean) =>
        `Are you sure you want to delete conversion${isMultipleSelected ? 's' : ''}?`,
    message: (isMultipleSelected: boolean) =>
        `This will delete ${isMultipleSelected ? 'them' : 'it'} permanently. You cannot undo this action.`,
}
