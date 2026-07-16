"use client";
import { useModal } from "@/hooks/useModal";
import { HelpCircle } from "lucide-react";
import HelpModal from "../modal/HelpModal";
import AppButton from "./AppButton";

export default function HelpButton() {
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
        <HelpCircle size={13} /> Help
      </AppButton>

      {/* Dialog */}
      <HelpModal onClose={closeModal} open={isOpen} />
    </div>
  );
}
