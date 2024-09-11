import * as yup from 'yup'

import { ConversionCountType, ConversionWindow } from 'types/Conversion'
import { TITLE, VALUE } from 'design/pages/Conversions/Conversions.constants'
import locale from './EditConversionModal.locale'

export const validationSchema = yup.object({
    [TITLE]: yup.string().max(255, locale.validation.title.maxLength).required(locale.validation.title.required),
    [VALUE]: yup
        .string()
        .required(locale.validation.value.required)
        .test('Positive integers only', locale.validation.value.positiveInteger, (value) =>
            /^[1-9]\d*$/.test(value as string),
        ),
})

export const COUNT_TYPE_OPTIONS = [
    {
        value: ConversionCountType.EVERY,
        label: locale.options.countType.every,
    },
    {
        value: ConversionCountType.ONE_PER_VIEWER,
        label: locale.options.countType.onePerView,
    },
]

export const CONVERSION_WINDOW_OPTIONS = [
    {
        value: `${ConversionWindow.Week}`,
        label: locale.options.windowOptions.week,
    },
    {
        value: `${ConversionWindow['30 days']}`,
        label: locale.options.windowOptions.month,
    },
    {
        value: `${ConversionWindow['60 days']}`,
        label: locale.options.windowOptions.twoMonths,
    },
    {
        value: `${ConversionWindow['90 days']}`,
        label: locale.options.windowOptions.threeMonths,
    },
    {
        value: `${ConversionWindow.Year}`,
        label: locale.options.windowOptions.year,
    },
]
