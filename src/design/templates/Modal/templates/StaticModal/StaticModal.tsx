import { Button } from "@mui/material";

import { Modal, useHandleModalClose } from "design/templates";

export const StaticModal = () => {
  const { handleModalClose } = useHandleModalClose();

  return (
    <Modal open onClose={handleModalClose} width="md">
      <Modal.Header onClose={handleModalClose} title="This is a static modal" />
      <Modal.Body>It has no props</Modal.Body>
      <Modal.Actions>
        <Button variant="outlined" onClick={handleModalClose}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
