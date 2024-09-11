import {
  Alert,
  type AlertColor,
  Snackbar,
  Slide,
  AlertTitle,
} from "@mui/material";
import {
  createContext,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

export interface ToastProviderProps {
  children: ReactNode;
}

export interface ToastContext {
  showToast: (params: ToastParams) => void;
  closeToast: () => void;
}

export const Context = createContext({} as ToastContext);

export interface ToastParams {
  message: string;
  title?: string;
  type?: AlertColor;
  duration?: number | null;
}

const defaults: ToastParams = {
  type: "info",
  message: "",
  duration: 2000,
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<ToastParams>(defaults);
  const [open, setOpen] = useState(false);

  const showToast = useCallback((params: ToastParams) => {
    setToast({ ...defaults, ...params });
    setOpen(true);
  }, []);

  const closeToast = useCallback(() => {
    setOpen(false);
  }, []);

  const contextValue = useMemo<ToastContext>(
    () => ({
      showToast,
      closeToast,
    }),
    [showToast, closeToast],
  );

  const { message, title, duration, type } = toast;

  return (
    <Context.Provider value={contextValue}>
      <Snackbar
        open={open}
        onClose={closeToast}
        autoHideDuration={duration}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={type}>
          {title && <AlertTitle>{title}</AlertTitle>}
          {message}
        </Alert>
      </Snackbar>
      {children}
    </Context.Provider>
  );
};
