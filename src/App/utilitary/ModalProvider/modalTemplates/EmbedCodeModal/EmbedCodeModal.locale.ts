import { locale } from 'locales'

export default {
    tab: {
        inlineEmbed: 'Inline Embed',
        quickShare: 'Quick Share / oEmbed',
    },
    notification: {
        sharingDisabled: 'Public sharing is disabled',
        loading: locale.messages.info.loading,
    },
    embed: {
        title: 'Embed Code',
        type: {
            title: 'Embed Types',
            async: {
                title: 'Standard',
                description: '(Asynchronous)',
            },
            multiple: {
                title: 'Multiple videos',
                description:
                    'Do NOT use this embed type for the first video on your page.\nOnly use this embed type for any secondary videos.',
            },
        },
        cta: locale.operations.generic.copyToClipboard,
    },
    quickShare: {
        link: {
            quickShare: 'Quickshare link',
            oEmbed: 'oEmbed link',
        },
        publicPreview: {
            label: 'Public Preview',
            description: 'Disable Public Preview and oEmbed',
        },
        cta: locale.operations.entity.copy,
    },
}
