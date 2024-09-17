import { useContext } from "react";
import { Context, ToastContext } from "./ToastProvider";

export const useToast = (): ToastContext => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useToast must be used within an Toast context");
  }

  return context;
};
