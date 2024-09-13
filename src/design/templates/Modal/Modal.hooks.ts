import { closeModal, useAppDispatch } from "App";
import { useCallback } from "react";

export const useHandleModalClose = () => {
  const dispatch = useAppDispatch();

  const handleModalClose = useCallback(() => dispatch(closeModal()), []);

  return { handleModalClose };
};
