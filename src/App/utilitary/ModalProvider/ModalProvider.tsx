import { useAppSelector } from "App/App.store.ts";
import { SimpleModal, ComplexModal } from "design/templates";
import { selectModalProviderState } from "./ModalProvider.slice.ts";

export const ModalProvider = () => {
  const { type } = useAppSelector(selectModalProviderState);

  switch (type) {
    case "Simple modal":
      return <SimpleModal />;
    // TODO: type issue. resolve
    case "Illegal modal":
      return <ComplexModal />;
    case "Complex modal":
      return <ComplexModal />;
  }

  return null;
};
