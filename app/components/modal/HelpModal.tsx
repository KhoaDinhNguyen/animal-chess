import Modal, { ModalAccentLine, ModalCard } from "./Modal";
import AppButton from "../button/AppButton";
import { X } from "lucide-react";

interface HelpModalProps {
  onClose: () => void;
  open: boolean;
}
export default function HelpModal(props: HelpModalProps) {
  const { onClose, open } = props;

  return (
    <Modal onClose={onClose} open={open}>
      <ModalCard className="w-full max-w-lg">
        <ModalAccentLine />

        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl" style={{ fontFamily: "'Cinzel Decorative', serif", color: "#f0e4c2" }}>
              Help
            </h2>
            <AppButton variant="tertiary" type="button" onClick={onClose}>
              <X size={18} />
            </AppButton>
          </div>
          <div className="space-y-3 text-xs leading-relaxed" style={{ color: "#a8c4a0" }}>
            <p>
              <strong style={{ color: "#c8892a" }}>Select:</strong> Click one of your pieces. Yellow arrows show where
              it can move.
            </p>
            <p>
              <strong style={{ color: "#c8892a" }}>Move:</strong> Click an arrow square to move your piece there.
            </p>
            <p>
              <strong style={{ color: "#e05040" }}>Capture:</strong> Sword icons mark enemy pieces you can take.
            </p>
            <p>
              <strong style={{ color: "#c8892a" }}>Traps:</strong> Enemy pieces landing in your traps lose all rank —
              capture them with anything.
            </p>
            <p>
              <strong style={{ color: "#c8892a" }}>Rivers:</strong> Only the Rat can enter water. Lion and Tiger leap
              over rivers (blocked by Rat in water).
            </p>
            <p>
              <strong style={{ color: "#c8892a" }}>Rat vs Elephant:</strong> Rat captures Elephant on land. Rat in water
              cannot capture Elephant on land.
            </p>
            <p>
              <strong style={{ color: "#c8892a" }}>Win:</strong> Move any piece into the opponent&apos;s den, or capture
              all their pieces.
            </p>
          </div>
        </div>
      </ModalCard>
    </Modal>
  );
}
