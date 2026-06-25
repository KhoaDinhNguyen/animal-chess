"use client";

import { useState } from "react";

type UseModalReturn = [
  isOpen: boolean,
  openModal: () => void,
  closeModal: () => void
]

export function useModal(initialState?: boolean): UseModalReturn {
  const [modal, setModal] = useState(initialState || false);

  function openModal() {
    setModal(modal => true);
  }

  function closeModal() {
    setModal(modal => false);
  }

  return [modal, openModal, closeModal];
}