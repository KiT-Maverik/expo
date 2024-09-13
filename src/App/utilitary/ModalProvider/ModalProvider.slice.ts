import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type RootState } from "App/App.store.ts";
import { ComplexModalProps } from "design/templates";

type Modal = "Simple modal" | "Complex modal" | "Closed";

type ModalWithoutProps = Exclude<Modal, "Simple modal" | "Closed">;

type ModalPropsVariants = ComplexModalProps | undefined;

export interface ModalProviderState<T extends ModalPropsVariants> {
  type: Modal;
  props: T;
}

const initialState: ModalProviderState<ModalPropsVariants> = {
  type: "Closed",
  props: undefined,
};

export const modalProviderSlice = createSlice({
  name: "modal provider",
  initialState,
  reducers: {
    openModal: (_, action: PayloadAction<{ type: ModalWithoutProps }>) => {
      const { type } = action.payload;

      return {
        type,
        props: undefined,
      };
    },
    openComplexModal: (_, action: PayloadAction<ComplexModalProps>) => {
      return {
        type: "Complex modal",
        props: action.payload,
      };
    },
    closeModal: () => initialState,
  },
});

export const { openComplexModal, openModal, closeModal } =
  modalProviderSlice.actions;

export const selectModalProviderState = (state: RootState) =>
  state.modalController;

export const modalProvider = modalProviderSlice.reducer;
