"use client";
import { useModal } from "@/hooks/useModal";
import GameInstructionModal from "../modal/GameInstructionModal";

// Game instruction Button + UI
export default function GameInstructionButton({ title }: { title: string }) {
  const [isOpen, openModal, closeModal] = useModal();

  return (
    <div>
      {/** Game instruction Button */}
      <button
        onClick={openModal}
        className="px-8 py-3.5 text-sm tracking-[0.15em] uppercase transition-all duration-200 hover:scale-105 active:scale-100"
        style={styles.buttonUI}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(143,168,138,0.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
        {title}
      </button>

      {/** GAme instruction Modal */}
      <GameInstructionModal onClose={closeModal} open={isOpen} />
    </div>
  );
}

const styles = {
  buttonUI: {
    fontFamily: "'Cinzel', serif",
    background: "transparent",
    color: "#8fa88a",
    fontWeight: 600,
    borderRadius: "2px",
    border: "1px solid rgba(143,168,138,0.35)",
  },
};
