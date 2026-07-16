import { ANIMALS, INSTRUCTIONS } from "@constants/pieces";
import Modal, { ModalAccentLine, ModalTitle, ModalCard } from "./Modal";
import AppButton from "../button/AppButton";
import { X } from "lucide-react";
import { gameInstructionStyles } from "./modal.styles";

interface GameInstructionModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Displays the game rules and animal rank reference.
 */
export default function GameInstructionModal({ open, onClose }: GameInstructionModalProps) {
  return (
    <Modal onClose={onClose} open={open}>
      <ModalCard className="relative flex max-h-[85vh] w-full max-w-lg flex-col xl:max-w-2xl">
        <ModalAccentLine />

        <div className="flex items-start justify-between px-8 pt-7 pb-4 shrink-0">
          <ModalTitle title="How to Play" subtitle="The Laws of the Jungle" />

          <AppButton variant="tertiary" type="button" onClick={onClose}>
            <X size={18} />
          </AppButton>
        </div>

        {/* Quick reference for each animal's rank */}
        <AnimalRankReference />

        {/* Scrollable game rules */}
        <InstructionList />
      </ModalCard>
    </Modal>
  );
}

function AnimalRankReference() {
  return (
    <div className="px-8 mb-4 shrink-0">
      <div className="grid grid-cols-8 gap-1">
        {ANIMALS.map(({ name, rank, symbol }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-0.5 py-1.5 rounded-sm"
            style={{ background: "rgba(200,137,42,0.07)", border: "1px solid rgba(200,137,42,0.15)" }}
            title={`Rank ${rank}: ${name}`}>
            <span className="text-xl">{symbol}</span>
            <span className="text-xs" style={{ fontFamily: "'Cinzel', serif", color: "#c8892a", fontSize: "0.80rem" }}>
              {name}
            </span>
            <span style={{ color: "#4a6350", fontSize: "0.80rem" }}>{rank}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InstructionList() {
  return (
    <div
      className="flex-1 overflow-y-auto px-8 pb-7 space-y-5"
      style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(200,137,42,0.2) transparent" }}>
      {INSTRUCTIONS.map((section, index) => (
        <div key={section.title}>
          <div className="flex items-center gap-3 mb-2">
            {/** Section number */}
            <span
              className="text-xs w-5 h-5 flex items-center justify-center rounded-full shrink-0"
              style={gameInstructionStyles.numberSection}>
              {index + 1}
            </span>

            {/** Section title */}
            <h3
              className="text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Cinzel', serif", color: "#c8892a" }}>
              {section.title}
            </h3>
          </div>

          {/** Section body */}
          <p className="text-sm leading-relaxed pl-8" style={{ color: "#a8c4a0" }}>
            {section.body}
          </p>
        </div>
      ))}
    </div>
  );
}
