import React from "react";
import { useModal } from "../../contexts/ModalContext";

export const Modal = () => {
  const { isOpen, content, close } = useModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded shadow-lg p-6 max-w-lg w-full relative">
        <button
          className="absolute top-3 right-3 text-secondary hover:text-primary"
          onClick={close}
          aria-label="Close"
        >
          &times;
        </button>
        {content}
      </div>
    </div>
  );
};
