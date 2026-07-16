"use client";

import { submitJoinGameForm } from "@/app/(lobby)/game/action";
import JoinGameModal from "../modal/JoinGameModal";
import { useModal } from "@/hooks/useModal";
import AppButton from "./AppButton";

export default function JoinGameButton({ title }: { title: string }) {
  const [isOpen, openModal, closeModal] = useModal(); // modal's control

  return (
    <div>
      {/* Trigger */}
      <AppButton
        variant="primary"
        type="button"
        onClick={openModal}
        className="group relative px-8 py-3.5 text-sm tracking-[0.15em] duration-200 hover:scale-105 active:scale-100">
        {title}
      </AppButton>

      {/* Dialog */}
      <JoinGameModal formAction={submitJoinGameForm} open={isOpen} onClose={closeModal} />
    </div>
  );
}
