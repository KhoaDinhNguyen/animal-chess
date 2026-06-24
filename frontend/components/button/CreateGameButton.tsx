"use client";
import { useModal } from "@/hooks/useModal";
import CreateGameModal from "../modal/CreateGameModal";
import { submitCreateGameForm } from "@/app/game/action";

// Create game Button + Modal
export default function CreateGameButton({ title }: { title: string }) {
  const [isOpen, openModal, closeModal] = useModal(false);

  return (
    <div>
      {/** Button UI */}
      <button
        onClick={openModal}
        className="group px-8 py-3.5 text-sm tracking-[0.15em] uppercase transition-all duration-200 hover:scale-105 active:scale-100"
        style={styles.buttonUI}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(200,137,42,0.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
        {title}
      </button>

      {/** Modal */}
      <CreateGameModal formAction={submitCreateGameForm} onClose={closeModal} open={isOpen} />
    </div>
  );
}

const styles = {
  buttonUI: {
    fontFamily: "'Cinzel', serif",
    background: "transparent",
    color: "#c8892a",
    fontWeight: 600,
    borderRadius: "2px",
    border: "1px solid #c8892a",
    boxShadow: "0 0 20px rgba(200,137,42,0.1)",
  },
};
