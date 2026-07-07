"use client";
import { useModal } from "@/hooks/useModal";
import QuitModal from "../modal/QuitModal";
import { Home } from "lucide-react";

/** Quit button + modal */
export default function QuitButton() {
  const [isOpen, openModal, closeModal] = useModal(false);

  return (
    <div>
      {/** Quit button */}
      <button
        onClick={openModal}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-widest uppercase transition-colors"
        style={{
          fontFamily: "'Cinzel', serif",
          color: "#8fa88a",
          border: "1px solid rgba(143,168,138,0.25)",
          borderRadius: "2px",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(143,168,138,0.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
        <Home size={13} /> Quit
      </button>

      {/** Quit modal */}
      <QuitModal open={isOpen} onClose={closeModal} />
    </div>
  );
}
