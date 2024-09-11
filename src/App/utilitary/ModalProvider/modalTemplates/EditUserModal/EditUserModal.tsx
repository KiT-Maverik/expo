import { useCallback } from 'react'
import { Formik, Form, FieldArray, FieldArrayRenderProps } from 'formik'
import { Box, Checkbox, InputAdornment, Typography, FormControlLabel, Divider } from '@mui/material'
import EmailOutlined from '@mui/icons-material/EmailOutlined'
import * as yup from 'yup'

import { SubUserFormData, SubUserPayload, SubUserPermission } from 'types/SubUser'
import withErrorBoundary from 'design/molecules/WithErrorBoundary'
import { trackAppCuesEvent, APPCUES_EVENTS } from 'thirdPartyServices/appCues'
import { useCreateSubUserMutation, useUpdateSubUserMutation } from 'api/mutations'
import { Modal } from 'design/templates/Modal'
import { Input } from 'design/atoms/Form'
import { EditSubUserProps, ModalDefaultProps } from 'design/templates/Modal/ModalTypes/types'
import { EMAIL, FIRST_NAME, INITIAL_VALUES, LAST_NAME, PERMISSIONS } from 'design/pages/UsersSettings/constants'
import { EMAIL_VALIDATION, FIRSTNAME_VALIDATION, LASTNAME_VALIDATION } from 'constants/validations/user.constants'
import styles from './EditUserModal.styles'
import { Actions } from './components/Actions'

type EditUserModalProps = EditSubUserProps & ModalDefaultProps

export const EditUserModal = withErrorBoundary(({ open = true, subUser, onClose }: EditUserModalProps) => {
    const onSuccess = useCallback(() => {
        if (!subUser) {
            trackAppCuesEvent(APPCUES_EVENTS.SUB_USER_ADDED)
        }
        onClose()
    }, [subUser])

    const createSubUserMutation = useCreateSubUserMutation({ onSuccess })
    const updateSubUserMutation = useUpdateSubUserMutation({ onSuccess })
    const isLoading = createSubUserMutation.isLoading || updateSubUserMutation.isLoading

    const validationSchema = yup.object({
        [FIRST_NAME]: FIRSTNAME_VALIDATION,
        [LAST_NAME]: LASTNAME_VALIDATION,
        [EMAIL]: EMAIL_VALIDATION,
    })

    const mapPermissions = (permissions: SubUserPermission[]): string[] =>
        permissions.filter(({ is_applied }) => is_applied).map(({ name }) => name)

    const handleSubmit = async (values: SubUserFormData) => {
        const { firstname, lastname, email, permissions } = values
        const payload: SubUserPayload = {
            firstname,
            lastname,
            email,
            permissions: mapPermissions(permissions),
        }

        if (subUser) {
            const { id, created, updated } = subUser
            await updateSubUserMutation.mutateAsync({
                ...payload,
                id,
                created,
                updated,
            })
        } else {
            await createSubUserMutation.mutateAsync(payload)
        }
    }

    const renderCheckboxes = (permissions: SubUserPermission[], arrayHelpers: FieldArrayRenderProps) =>
        permissions.map((permission: SubUserPermission) => {
            const index = permissions.indexOf(permission)

            return (
                <FormControlLabel
                    key={permissions[index].name}
                    label={permissions[index].title}
                    checked={permissions[index].is_applied}
                    onChange={(_, value) => {
                        arrayHelpers.replace(index, {
                            name: permission.name,
                            title: permission.title,
                            is_applied: value,
                        })
                    }}
                    control={<Checkbox />}
                />
            )
        })

    return (
        <Modal open={open} onClose={onClose}>
            <Formik
                initialValues={subUser ? subUser : INITIAL_VALUES}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, setFieldValue }) => (
                    <>
                        <Modal.Header title={`${subUser ? 'Edit' : 'Create new'} user`} onClose={onClose} />
                        <Modal.Body>
                            <Form>
                                <Box sx={styles.grid.container}>
                                    <Box sx={styles.grid.firstName}>
                                        <Input
                                            variant="outlined"
                                            id="firstNameSubUser"
                                            label="First name"
                                            name={FIRST_NAME}
                                            value={values[FIRST_NAME]}
                                            onChange={(event) => setFieldValue(FIRST_NAME, event.target.value)}
                                            error={!!(errors[FIRST_NAME] && touched[FIRST_NAME])}
                                            fullWidth
                                        />
                                    </Box>
                                    <Box sx={styles.grid.lastName}>
                                        <Input
                                            id="lastNameSubUser"
                                            label="Last name"
                                            value={values[LAST_NAME]}
                                            name={LAST_NAME}
                                            onChange={(event) => setFieldValue(LAST_NAME, event.target.value)}
                                            error={!!(errors[LAST_NAME] && touched[LAST_NAME])}
                                            fullWidth
                                        />
                                    </Box>
                                    <Box sx={styles.grid.email}>
                                        <Input
                                            id="emailSubUser"
                                            label="Email"
                                            value={values[EMAIL]}
                                            name={EMAIL}
                                            onChange={(event) => setFieldValue(EMAIL, event.target.value)}
                                            error={!!(errors[EMAIL] && touched[EMAIL])}
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailOutlined />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Box>

                                    <Box sx={styles.grid.permissions.container}>
                                        <Typography variant="h7" sx={styles.grid.permissions.title}>
                                            Permissions
                                        </Typography>
                                        <FieldArray
                                            name={PERMISSIONS}
                                            render={(arrayHelpers) =>
                                                renderCheckboxes(values[PERMISSIONS], arrayHelpers)
                                            }
                                        />
                                    </Box>
                                </Box>
                            </Form>
                        </Modal.Body>
                        <Divider sx={styles.divider} />
                        <Actions isMutationLoading={isLoading} onClose={onClose} />
                    </>
                )}
            </Formik>
        </Modal>
    )
})

export default EditUserModal
