import { useCallback } from 'react'
import { Formik } from 'formik'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined'
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import { Modal } from 'design/templates/Modal'
import { getFolderTitle } from 'design/pages/MyVids/VidsTable'
import { Input } from 'design/atoms/Form'
import { useVideoFoldersQuery } from 'api/queries'
import { useLayout } from 'hooks/utilities/useLayout'
import { useAddFolderMutation } from 'api/mutations'
import { FolderAPI } from 'types/Video'
import { ROOT } from 'constants/api.constants'
import style from './AddFolderModal.style'

type AddFolderProps = {
    open: boolean
    onFolderCreate: (target: string) => void
    onClose: () => void
}

const FOLDER_NAME = 'FOLDER_NAME'

export const AddFolderModal = ({ open, onFolderCreate, onClose }: AddFolderProps) => {
    const { data: folders } = useVideoFoldersQuery()
    const initialName = getFolderTitle(folders)
    const { isMobile } = useLayout()
    const addFolderMutation = useAddFolderMutation()

    const handleMoveToFolder = useCallback(
        async (values: { [FOLDER_NAME]: string }) => {
            const folderName = values[FOLDER_NAME]

            if (!folderName) {
                return
            }

            onClose()

            const folder = (await addFolderMutation.mutateAsync({
                folder: { parentFolderGuid: ROOT, title: folderName },
            })) as FolderAPI

            if (folder) {
                onFolderCreate(folder.guid)
            }
        },
        [onFolderCreate, addFolderMutation],
    )

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="add-folder-modal" aria-describedby="add-folder-modal">
            <Modal.Header onClose={onClose} nodeTitle>
                <Typography variant="h5" display="flex" alignItems="center" sx={style.title}>
                    <FolderOpenOutlinedIcon />
                    Create folder
                </Typography>
            </Modal.Header>
            <Modal.Body>
                <Formik initialValues={{ [FOLDER_NAME]: initialName }} onSubmit={handleMoveToFolder}>
                    {({ values, setFieldValue, submitForm }) => (
                        <Box sx={style.content}>
                            <Divider />

                            <Box sx={style.folder.root} display="flex" alignItems="center">
                                <Box sx={style.folder.icon} display="flex" alignItems="center" justifyContent="center">
                                    <FolderCopyOutlinedIcon />
                                </Box>
                                <Box sx={style.folder.input.root} display="flex" alignItems="flex-end">
                                    <Input
                                        id={FOLDER_NAME}
                                        label=""
                                        name={FOLDER_NAME}
                                        onChange={(event) => setFieldValue(FOLDER_NAME, event.target.value)}
                                        value={values[FOLDER_NAME]}
                                        fullWidth
                                    />
                                    <Box component="label" sx={style.folder.input.icon} htmlFor={FOLDER_NAME}>
                                        <EditOutlinedIcon />
                                    </Box>
                                </Box>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item mobile={6}>
                                    <Button
                                        variant="contained"
                                        disabled={!values[FOLDER_NAME]}
                                        type="submit"
                                        onClick={submitForm}
                                        fullWidth
                                        size={isMobile ? 'small' : 'medium'}
                                    >
                                        {isMobile ? 'Move to Folder' : 'Move to selected folder'}
                                    </Button>
                                </Grid>
                                <Grid item mobile={6}>
                                    <Button
                                        variant="outlined"
                                        onClick={onClose}
                                        fullWidth
                                        size={isMobile ? 'small' : 'medium'}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}
