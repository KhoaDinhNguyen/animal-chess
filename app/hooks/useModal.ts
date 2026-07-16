"use client";

import { useState } from "react";

type UseModalReturn = [
  isOpen: boolean,
  openModal: () => void,
  closeModal: () => void
]

/** Tracks whether a modal is open and exposes explicit open/close handlers. */
export function useModal(initialState?: boolean): UseModalReturn {
  const [isOpen, setIsOpen] = useState(initialState ?? false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return [isOpen, openModal, closeModal];
}