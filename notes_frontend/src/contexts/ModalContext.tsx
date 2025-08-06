"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

type ModalState = {
  isOpen: boolean;
  content: ReactNode | null;
  open: (content: ReactNode) => void;
  close: () => void;
};

const ModalContext = createContext<ModalState | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const open = (c: ReactNode) => {
    setContent(c);
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, content, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

// PUBLIC_INTERFACE
export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
