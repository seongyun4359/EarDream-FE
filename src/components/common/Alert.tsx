import React from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import type { ButtonVariant, ButtonSize } from "../../types/button";

interface AlertProps {
  icon?: React.ReactNode;
  alertClassName?: string;
  message: string;
  alertHelperText?: string;
  confirmText: string;
  cancelText?: string;
  confirmVariant: ButtonVariant;
  cancelVariant?: ButtonVariant;
  confirmClassName?: string;
  cancelClassName?: string;
  confirmSize?: ButtonSize;
  cancelSize?: ButtonSize;
  onConfirm: () => void;
  onCancel?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  icon,
  alertClassName,
  message,
  alertHelperText,
  confirmText,
  cancelText,
  confirmVariant,
  cancelVariant,
  confirmClassName,
  cancelClassName,
  confirmSize,
  cancelSize,
  onConfirm,
  onCancel,
}) => {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div
        className={`relative bg-white rounded-2xl shadow-lg p-6 w-90 text-center z-10 ${alertClassName}`}
      >
        <div className="flex flex-col items-center mb-6 space-y-3">
          {icon}
          <p className="text-gray-800 text-lg">{message}</p>
          <p className="text-gray-400 text-sm">{alertHelperText}</p>
        </div>

        <div className="flex justify-between">
          {cancelText && (
            <Button
              variant={cancelVariant}
              size={cancelSize}
              onClick={onCancel}
              className={cancelClassName}
            >
              {cancelText}
            </Button>
          )}

          {confirmText && (
            <Button
              variant={confirmVariant}
              size={confirmSize}
              onClick={onConfirm}
              className={confirmClassName}
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Alert;
