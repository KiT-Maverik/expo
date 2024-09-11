import { Fragment, useMemo, useState } from 'react'
import { Box, Button, Typography, InputAdornment, TextField } from '@mui/material'
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { Modal } from 'design/templates/Modal'
import { flatListToTree } from 'design/pages/MyVids'
import { Folder } from 'types/Video'
import { useVideoFoldersQuery } from 'api/queries'
import { InputChangeHandler } from 'types'

import { useLayout } from 'hooks/utilities/useLayout'
import { ROOT } from 'constants/api.constants'
import style from './MoveFolderModal.style'

interface MoveFolderModalProps {
    open: boolean
    onClose: () => void
    onDrop: (target: string) => void
}

type Extension = {
    children: ExpandedFolder[]
}

type ExpandedFolder = Folder & Extension

export const MoveFolderModal = ({ open, onClose, onDrop }: MoveFolderModalProps) => {
    const { data: videoFolders } = useVideoFoldersQuery()
    const [filter, setFilter] = useState('')
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
    const { isMobile } = useLayout()

    const folders = useMemo(() => {
        let records = [] as ExpandedFolder[]

        if (videoFolders?.length) {
            records = JSON.parse(JSON.stringify(videoFolders))
        }

        const filtered = records.filter((r) => r.title.toLowerCase().includes(filter.toLowerCase()))

        const tree = flatListToTree(
            filtered,
            'guid',
            'parentFolderGuid',
            'children',
            (node) => node.parentFolderGuid === ROOT,
        )

        return (
            'main'.includes(filter.toLowerCase())
                ? [{ guid: ROOT, title: 'Main', parentFolderGuid: null, children: tree }]
                : tree
        ) as ExpandedFolder[]
    }, [videoFolders, filter])

    const filterHandler: InputChangeHandler = (event) => {
        setFilter(event.target.value)
    }

    const reset = () => {
        setFilter('')
        setSelectedFolder(null)
    }

    const resetAndClose = () => {
        onClose()
        reset()
    }

    const onSubmit = () => {
        if (selectedFolder) {
            resetAndClose()
            onDrop(selectedFolder)
        }
    }

    const renderList = (list: ExpandedFolder[], isChild: boolean) => (
        <List sx={[isChild && style.list.root]} component="div" disablePadding={isChild}>
            {list.map(({ guid, children, title }) => (
                <Fragment key={guid}>
                    <ListItemButton
                        sx={[
                            style.list.item.root,
                            isChild && style.list.item.child,
                            selectedFolder === guid && style.list.item.selected,
                        ]}
                        onClick={() => setSelectedFolder(guid)}
                    >
                        <ListItemIcon>
                            <FolderOpenOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={title} />
                    </ListItemButton>
                    {children && renderList(children, true)}
                </Fragment>
            ))}
        </List>
    )

    return (
        <Modal open={open} onClose={resetAndClose} aria-labelledby="move-folder" aria-describedby="move-folder">
            <Modal.Header onClose={resetAndClose} nodeTitle>
                <Typography variant="h5" display="flex" alignItems="center" sx={style.title}>
                    <FolderOpenOutlinedIcon />
                    Move to folder
                </Typography>
            </Modal.Header>
            <Modal.Body>
                <Box sx={style.content}>
                    <TextField
                        value={filter}
                        placeholder="Search folder by name"
                        fullWidth
                        type="text"
                        onChange={filterHandler}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlinedIcon />
                                </InputAdornment>
                            ),
                            notched: false,
                        }}
                    />

                    <Box sx={style.foldersTree}>{renderList(folders, false)}</Box>
                </Box>
            </Modal.Body>
            <Modal.Actions>
                <Button
                    variant="contained"
                    disabled={!selectedFolder}
                    onClick={onSubmit}
                    fullWidth
                    size={isMobile ? 'small' : 'medium'}
                >
                    {isMobile ? 'Move to Folder' : 'Move to selected folder'}
                </Button>
                <Button variant="outlined" onClick={resetAndClose} fullWidth size={isMobile ? 'small' : 'medium'}>
                    Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
