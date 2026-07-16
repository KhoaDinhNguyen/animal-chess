"use client";
import { useModal } from "@/hooks/useModal";
import QuitModal from "../modal/QuitModal";
import { Home } from "lucide-react";
import AppButton from "./AppButton";

export default function QuitButton() {
  const [isOpen, openModal, closeModal] = useModal(false);

  return (
    <div>
      {/* Trigger */}
      <AppButton
        onClick={openModal}
        variant="secondary"
        type="button"
        className="gap-1.5 px-3 py-1.5"
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(143,168,138,0.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
        <Home size={13} /> Quit
      </AppButton>

      {/* Dialog */}
      <QuitModal open={isOpen} onClose={closeModal} />
    </div>
  );
}
