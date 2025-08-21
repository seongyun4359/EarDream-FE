import React from "react";
import { createPortal } from "react-dom";
import Button from "../components/common/Button";

interface DeleteAlertProps {
  message: string;
  onConfirm?: () => void;
  onCancel: () => void;
}

const DeleteAlert: React.FC<DeleteAlertProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="relative bg-white rounded-2xl shadow-lg p-6 w-80 text-center z-10">
        <div className="flex flex-col items-center mb-6 space-y-3">
          <svg
            className="w-12 h-12 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v4m0 4h.01M10.29 3.86l-7.39 12.78A1.75 1.75 0 004.29 19h15.42c.93 0 1.64-.79 1.39-1.36l-7.39-12.78a1.75 1.75 0 00-3.42 0z"
            />
          </svg>

          <p className="text-gray-800 text-lg">{message}</p>
        </div>

        <div className="flex justify-between">
          <Button variant="text" size="small" onClick={onCancel}>
            아니오
          </Button>

          <Button
            variant="text"
            size="small"
            onClick={onConfirm}
            className="mr-4"
          >
            네
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteAlert;
