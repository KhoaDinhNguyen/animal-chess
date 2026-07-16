"use client";
import { useModal } from "@/hooks/useModal";
import GameInstructionModal from "../modal/GameInstructionModal";
import AppButton from "./AppButton";

export default function GameInstructionButton({ title }: { title: string }) {
  const [isOpen, openModal, closeModal] = useModal();

  return (
    <div>
      {/* Trigger */}
      <AppButton
        variant="secondary"
        type="button"
        onClick={openModal}
        className="px-8 py-3.5 text-sm tracking-[0.15em] duration-200 hover:scale-105 active:scale-100"
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(143,168,138,0.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
        {title}
      </AppButton>

      {/* Dialog */}
      <GameInstructionModal onClose={closeModal} open={isOpen} />
    </div>
  );
}
