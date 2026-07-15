"use client";

import { useRouter } from "next/navigation";
import Modal, { ModalAccentLine, ModalButton, ModalCard } from "./Modal";

interface QuitModalProps {
  onClose: () => void;
  open: boolean;
}

/**
 * Confirms before leaving the current game.
 */
export default function QuitModal(props: QuitModalProps) {
  const { onClose, open } = props;
  const router = useRouter();

  return (
    <Modal onClose={onClose} open={open}>
      <ModalCard className="w-full max-w-sm">
        <ModalAccentLine />

        <div className="px-6 py-6 text-center">
          <h2 className="text-lg mb-2" style={{ fontFamily: "'Cinzel Decorative', serif", color: "#f0e4c2" }}>
            Quit Game?
          </h2>
          <p className="text-xs mb-6" style={{ color: "#8fa88a" }}>
            Current game progress will be lost.
          </p>

          <div className="flex gap-3">
            <ModalButton variant="secondary" onClick={onClose}>
              Stay
            </ModalButton>
            <ModalButton variant="primary" onClick={() => router.push("/")}>
              Quit
            </ModalButton>
          </div>
        </div>
      </ModalCard>
    </Modal>
  );
}
