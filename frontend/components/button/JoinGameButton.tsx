"use client";

import { submitJoinGameForm } from "@/app/game/action";
import JoinGameModal from "../modal/JoinGameModal";
import { useModal } from "@/hooks/useModal";

interface JoinGameButtonInterface {
  title: string;
}

// Join game button + modal
export default function JoinGameButton(props: JoinGameButtonInterface) {
  const { title } = props;
  const [isOpen, openModal, closeModal] = useModal(); // modal's control

  return (
    <div>
      {/** Button UI */}
      <button
        className="group relative px-8 py-3.5 text-sm tracking-[0.15em] uppercase transition-all duration-200 hover:scale-105 active:scale-100"
        style={styles.buttonUI}
        onClick={openModal}>
        {title}
      </button>

      {/** Modal UI */}
      <JoinGameModal formAction={submitJoinGameForm} open={isOpen} onClose={closeModal} />
    </div>
  );
}

// Styling
const styles = {
  buttonUI: {
    fontFamily: "'Cinzel', serif",
    background: "linear-gradient(135deg, #c8892a, #a06a18)",
    color: "#0b1a10",
    fontWeight: 600,
    borderRadius: "2px",
    boxShadow: "0 4px 24px rgba(200,137,42,0.3)",
  },
};
