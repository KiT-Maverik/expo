import { Form, Formik } from 'formik'
import {
    Button,
    Divider,
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined'
import { get as _get } from 'lodash'

import { Input } from 'design/atoms/Form'
import { Modal } from 'design/templates/Modal'
import { useUpdateCustomerMutation } from 'api/mutations'
import { useCustomerQuery } from 'api/queries'
import { EMAIL, PASSWORD, CHANGE_EMAIL_VALIDATION_FORM } from 'constants/validations/user.constants'

import locale from './EditEmailModal.locale'

type EditEmailModalProps = {
    onClose: () => void
}

export const EditEmailModal = ({ onClose }: EditEmailModalProps) => {
    const { mutateAsync } = useUpdateCustomerMutation()
    const { data, isLoading } = useCustomerQuery()

    const initialValues = {
        [EMAIL]: '',
        [PASSWORD]: '',
    }

    return (
        <Modal open onClose={onClose} width="md">
            <Modal.Header onClose={onClose}>
                <Stack width={1}>
                    <Typography variant="h7" fontWeight={500}>
                        {locale.title}
                    </Typography>
                </Stack>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={CHANGE_EMAIL_VALIDATION_FORM}
                    onSubmit={async (values) => {
                        await mutateAsync({
                            [EMAIL]: _get(values, EMAIL, ''),
                            [PASSWORD]: _get(values, PASSWORD, ''),
                        })
                        onClose()
                    }}
                >
                    {({ handleSubmit, resetForm, isSubmitting, isValid, dirty }) => (
                        <Form onSubmit={handleSubmit}>
                            <Stack gap={4}>
                                <FormControl>
                                    <InputLabel>{locale.currentEmail}</InputLabel>
                                    <OutlinedInput
                                        value={_get(data, EMAIL, '')}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <MailOutlinedIcon />
                                            </InputAdornment>
                                        }
                                        disabled
                                    />
                                </FormControl>

                                <Input
                                    name={EMAIL}
                                    variant="outlined"
                                    label={locale.newEmail}
                                    placeholder={locale.emailPlaceholder}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MailOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Input
                                    name={PASSWORD}
                                    variant="outlined"
                                    type="password"
                                    label={locale.currentPassword}
                                />

                                <Divider sx={{ mt: 2 }} />

                                <Stack direction="row" justifyContent="end" gap={2}>
                                    <Button
                                        onClick={() => {
                                            resetForm()
                                            onClose()
                                        }}
                                        disabled={isSubmitting}
                                        variant="outlined"
                                        color="tertiary"
                                    >
                                        {locale.cancel}
                                    </Button>
                                    <LoadingButton
                                        disabled={isLoading || isSubmitting || !isValid || !dirty}
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting}
                                    >
                                        {locale.save}
                                    </LoadingButton>
                                </Stack>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default EditEmailModal
