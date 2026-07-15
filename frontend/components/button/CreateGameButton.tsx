"use client";
import { useModal } from "@/hooks/useModal";
import CreateGameModal from "../modal/CreateGameModal";
import { submitCreateGameForm } from "@/app/game/action";
import AppButton from "./AppButton";

export default function CreateGameButton({ title }: { title: string }) {
  const [isOpen, openModal, closeModal] = useModal(false);

  return (
    <div>
      {/* Trigger */}
      <AppButton
        variant="primary-border"
        type="button"
        onClick={openModal}
        className="group px-8 py-3.5 text-sm tracking-[0.15em] uppercase transition-all duration-200 hover:scale-105 active:scale-100"
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(200,137,42,0.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
        {title}
      </AppButton>

      {/* Dialog */}
      <CreateGameModal formAction={submitCreateGameForm} onClose={closeModal} open={isOpen} />
    </div>
  );
}
