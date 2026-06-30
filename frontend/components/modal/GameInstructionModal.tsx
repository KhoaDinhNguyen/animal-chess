import { ANIMALS } from "@/app/game/page";
import Modal from "./Modal";
import { X } from "lucide-react";

interface GameInstructionModalProps {
  open: boolean;
  onClose: () => void;
}

export default function GameInstructionModal(props: GameInstructionModalProps) {
  const { open, onClose } = props;

  return (
    <Modal onClose={onClose} open={open}>
      <div className="w-full xl:max-w-2xl max-w-lg relative max-h-[85vh] flex flex-col" style={styles.rootContainer}>
        {/** Top accent line */}
        <div
          className="h-0.5 w-full shrink-0"
          style={{ background: "linear-gradient(90deg, transparent, #c8892a, transparent)" }}
        />

        {/** Modal's header */}
        <div className="flex items-start justify-between px-8 pt-7 pb-4 shrink-0">
          <div>
            <h2 className="text-2xl mb-1" style={{ fontFamily: "'Cinzel Decorative', serif", color: "#f0e4c2" }}>
              How to Play
            </h2>
            <p
              className="text-xs tracking-widest uppercase"
              style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
              The Laws of the Jungle
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center transition-colors rounded-sm hover:bg-white/5"
            style={{ color: "#8fa88a" }}>
            <X size={18} />
          </button>
        </div>

        {/* Rank reference */}
        <div className="px-8 mb-4 shrink-0">
          <div className="grid grid-cols-8 gap-1">
            {ANIMALS.map((a) => (
              <div
                key={a.name}
                className="flex flex-col items-center gap-0.5 py-1.5 rounded-sm"
                style={{ background: "rgba(200,137,42,0.07)", border: "1px solid rgba(200,137,42,0.15)" }}
                title={`Rank ${a.rank}: ${a.name}`}>
                {/** Symbol */}
                <span className="text-xl">{a.symbol}</span>
                {/** NAme */}
                <span
                  className="text-xs"
                  style={{ fontFamily: "'Cinzel', serif", color: "#c8892a", fontSize: "0.80rem" }}>
                  {a.name}
                </span>
                <span style={{ color: "#4a6350", fontSize: "0.80rem" }}>{a.rank}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable rule sections */}
        <div
          className="flex-1 overflow-y-auto px-8 pb-7 space-y-5"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(200,137,42,0.2) transparent" }}>
          {INSTRUCTIONS.map((section, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 mb-2">
                {/** Section number */}
                <span
                  className="text-xs w-5 h-5 flex items-center justify-center rounded-full shrink-0"
                  style={styles.numberSection}>
                  {i + 1}
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
      </div>
    </Modal>
  );
}

const styles = {
  rootContainer: {
    background: "#0f1e14",
    border: "1px solid rgba(200,137,42,0.3)",
    borderRadius: "4px",
    boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
  },
  numberSection: {
    fontFamily: "'Cinzel', serif",
    background: "rgba(200,137,42,0.15)",
    border: "1px solid rgba(200,137,42,0.3)",
    color: "#c8892a",
    fontSize: "0.6rem",
  },
};

const INSTRUCTIONS = [
  {
    title: "Overview",
    body: "Shou Dou Qi, also known as Jungle Chess or Animal Chess, is a two-player Chinese strategy board game. Each player commands eight animals ranked by strength, moving across a jungle terrain to capture the opponent's den.",
  },
  {
    title: "The Board",
    body: "The board is 9x7 squares. It contains two dens (one per player), three traps flanking each den, and two six-squares river in the center. River squares block most animals — only the Rat may enter water.",
  },
  {
    title: "Animal Ranks",
    body: "Animals are ranked 1-8. Higher rank captures lower rank. Exception: the Rat (rank 1) can capture the Elephant (rank 8) when entering its square. Traps weaken any animal to rank 0 — capturable by anything.",
  },
  {
    title: "Movement",
    body: "Each animal moves one square orthogonally per turn. The Lion and Tiger may leap over the river in a straight line — unless a Rat is in their path. The Rat is the only piece that can swim across the river.",
  },
  {
    title: "Winning",
    body: "A player wins by moving any animal into the opponent's den, or by capturing all of the opponent's pieces. Pieces cannot enter their own den.",
  },
];
