"use client";
import { useModal } from "@/hooks/useModal";
import { HelpCircle } from "lucide-react";
import HelpModal from "../modal/HelpModal";

// Help Modal + Button
export default function HelpButton() {
  const [isOpen, openModal, closeModal] = useModal(false);

  return (
    <div>
      {/** Help button */}
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
        <HelpCircle size={13} /> Help
      </button>

      {/** Help Modal */}
      <HelpModal onClose={closeModal} open={isOpen} />
    </div>
  );
}
