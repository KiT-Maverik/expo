import { Button } from "@mui/material";

import { Modal, useHandleModalClose } from "design/templates";

export const FullscreenModal = () => {
  const { handleModalClose } = useHandleModalClose();

  return (
    <Modal open onClose={handleModalClose} width="md" layout="fullscreen">
      <Modal.Header
        onClose={handleModalClose}
        title="This is a fulscreen modal"
      />
      <Modal.Body>
        It occupies maximum space. Also it has clickable overlay to close it on
        click.
      </Modal.Body>
      <Modal.Actions>
        <Button variant="outlined" onClick={handleModalClose}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
