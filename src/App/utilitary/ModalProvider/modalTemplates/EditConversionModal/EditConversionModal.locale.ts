export default {
    title: {
        edit: 'Edit Conversion',
        create: 'Create New Conversion',
    },
    validation: {
        title: {
            required: 'Give a name to your conversion',
            maxLength: 'This value is too long. It should be 255 characters or less.',
        },
        value: {
            required: 'Please specify how much is this conversion worth to you',
            positiveInteger: 'Default value should be a positive integer',
        },
    },
    options: {
        countType: {
            every: 'Every conversion',
            onePerView: 'One conversion per viewer',
        },
        windowOptions: {
            week: 'Week',
            month: '30 days',
            twoMonths: '60 days',
            threeMonths: '90 days',
            year: 'Year',
        },
    },
    inputTitle: {
        name: {
            label: 'Name',
            placeholder: 'Type here...',
        },
        defaultValue: {
            label: 'Default Value',
            placeholder: 'Type here... $',
            helpTooltip: 'Enter the average value each conversion is worth to your business.',
        },
        count: 'Count',
        conversionWindow: {
            label: 'Conversion window',
            helpTooltip: 'Select the time frame for counting conversions after a video was viewed.',
        },
    },
}
