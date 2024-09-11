import { Formik, Form } from 'formik'
import mixpanel from 'mixpanel-browser'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import AttachMoney from '@mui/icons-material/AttachMoney'

import { Modal } from 'design/templates/Modal'
import { Conversion, ConversionFormData } from 'types/Conversion'
import withErrorBoundary from 'design/molecules/WithErrorBoundary'
import { useCreateConversionMutation, useUpdateConversionMutation } from 'api/mutations'
import { Input, Select } from 'design/atoms/Form'
import {
    TITLE,
    VALUE,
    COUNT_TYPE,
    CONVERSION_WINDOW,
    INITIAL_VALUES,
} from 'design/pages/Conversions/Conversions.constants'
import { MIXPANEL_EVENTS } from 'thirdPartyServices/mixpanel'
import { HelpTooltip } from 'design/atoms/HelpTooltip'
import locale from './EditConversionModal.locale'
import style from './EditConversionModal.style'
import { CONVERSION_WINDOW_OPTIONS, COUNT_TYPE_OPTIONS, validationSchema } from './EditConversionModal.utils'
import { Actions } from './components/Actions'

interface EditConversionModalProps {
    open: boolean
    conversion?: Conversion
    onClose: () => void
}

export const EditConversionModal = withErrorBoundary(({ open, conversion, onClose }: EditConversionModalProps) => {
    const handleConversionModal = (isCreated?: boolean) => {
        if (isCreated) {
            mixpanel.track(MIXPANEL_EVENTS.CONVERSION_CREATED)
        }
        onClose()
    }

    const createConversionMutation = useCreateConversionMutation({ onSuccess: () => handleConversionModal(true) })
    const updateConversionMutation = useUpdateConversionMutation({ onMutate: () => handleConversionModal() })
    const isMutationLoading = createConversionMutation.isLoading || updateConversionMutation.isLoading

    const handleSubmit = async (values: ConversionFormData) => {
        if (conversion) {
            await updateConversionMutation.mutateAsync({
                conversion: {
                    guid: conversion.guid,
                    ...values,
                },
            })
        } else {
            await createConversionMutation.mutateAsync({
                conversion: {
                    ...values,
                },
            })
        }
    }

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="edit-conversion-modal">
            <Modal.Header title={conversion ? locale.title.edit : locale.title.create} onClose={onClose} />
            <Formik
                initialValues={conversion ? conversion : INITIAL_VALUES}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, setFieldValue }) => (
                    <>
                        <Modal.Body>
                            <Form>
                                <Box sx={style.form.group}>
                                    <Box component="label" sx={style.form.label} htmlFor="conversionTitle">
                                        <Typography variant="body2">{locale.inputTitle.name.label}</Typography>
                                    </Box>
                                    <Box sx={style.form.control}>
                                        <Input
                                            name={TITLE}
                                            id="conversionTitle"
                                            label=""
                                            placeholder={locale.inputTitle.name.placeholder}
                                            value={values[TITLE]}
                                            onChange={(event) => setFieldValue(TITLE, event.target.value)}
                                            error={!!(errors[TITLE] && touched[TITLE])}
                                            fullWidth
                                        />
                                    </Box>
                                </Box>

                                <Box sx={style.form.group}>
                                    <Box component="label" sx={style.form.label} htmlFor="conversionValue">
                                        <Typography variant="body2">{locale.inputTitle.defaultValue.label}</Typography>

                                        <HelpTooltip
                                            PopperProps={{
                                                sx: style.form.helpTooltip,
                                            }}
                                            title={locale.inputTitle.defaultValue.helpTooltip}
                                            placement="bottom-start"
                                        />
                                    </Box>
                                    <Box sx={style.form.control}>
                                        <Input
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AttachMoney />
                                                    </InputAdornment>
                                                ),
                                                notched: false,
                                            }}
                                            name={VALUE}
                                            id="conversionValue"
                                            label=""
                                            placeholder={locale.inputTitle.defaultValue.placeholder}
                                            value={values[VALUE]}
                                            onChange={(event) => setFieldValue(VALUE, event.target.value)}
                                            error={!!(errors[VALUE] && touched[VALUE])}
                                            fullWidth
                                        />
                                    </Box>
                                </Box>

                                <Box sx={[style.form.group, style.form.groupWithPadding]}>
                                    <Box component="label" sx={style.form.label} htmlFor="conversionCount">
                                        <Typography variant="body2">{locale.inputTitle.count}</Typography>
                                    </Box>
                                    <Box sx={style.form.control}>
                                        <Select name={COUNT_TYPE} label="" options={COUNT_TYPE_OPTIONS} />
                                    </Box>
                                </Box>

                                <Box sx={style.form.group}>
                                    <Box component="label" sx={style.form.label} htmlFor="conversionWindow">
                                        <Typography variant="body2">
                                            {locale.inputTitle.conversionWindow.label}
                                        </Typography>

                                        <HelpTooltip
                                            PopperProps={{
                                                sx: style.form.helpTooltip,
                                            }}
                                            title={locale.inputTitle.conversionWindow.helpTooltip}
                                            placement="bottom-start"
                                        />
                                    </Box>
                                    <Box sx={style.form.control}>
                                        <Select name={CONVERSION_WINDOW} label="" options={CONVERSION_WINDOW_OPTIONS} />
                                    </Box>
                                </Box>
                            </Form>
                        </Modal.Body>
                        <Actions onClose={onClose} isMutationLoading={isMutationLoading} />
                    </>
                )}
            </Formik>
        </Modal>
    )
})
