import { useCallback } from "react";
import { useToast } from "App/utilitary/ToastProvider/ToastProvider.hooks";
import { useLocale } from "./useLocale.hook";

export const useCopyToClipboard = () => {
  const { showToast } = useToast();
  const { messages } = useLocale();

  const copy = useCallback(
    (text: string) => {
      if (window.isSecureContext) {
        navigator.clipboard
          .writeText(text)
          .then(() =>
            showToast({ type: "success", message: messages.status.copied }),
          )
          .catch(() =>
            showToast({ type: "error", message: messages.status.error }),
          );
      } else {
        console.error("The context is NOT secure");
      }
    },
    [messages],
  );

  return { copy };
};
