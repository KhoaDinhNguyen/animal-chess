import Modal from "./Modal";
import { useState } from "react";

interface CreateGameModalProps {
  formAction: (formData: FormData) => void;
  onClose: () => void;
  open: boolean;
}

// Create game Modal
export default function CreateGameModal(props: CreateGameModalProps) {
  const { formAction, open, onClose } = props;
  const [gameMode, setGameMode] = useState("single");

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-full max-w-md relative" style={styles.rootContainer}>
        <div
          className="h-0.5 w-full"
          style={{ background: "linear-gradient(90deg, transparent, #c8892a, transparent)" }}
        />
        {/** Modal's title */}
        <div className="px-8 py-7">
          <h2 className="text-2xl mb-1" style={{ fontFamily: "'Cinzel Decorative', serif", color: "#f0e4c2" }}>
            Create Game
          </h2>
          <p
            className="text-xs tracking-widest uppercase mb-7"
            style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
            Claim the Jungle
          </p>

          {/** Modal's form */}
          <form action={formAction}>
            <div className="space-y-5">
              {/** Your name input */}
              {/* <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs tracking-widest uppercase"
                  style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 outline-none text-sm"
                  style={{
                    background: "#1a2c20",
                    border: "1px solid rgba(200,137,42,0.25)",
                    borderRadius: "2px",
                    color: "#f0e4c2",
                    fontFamily: "'Noto Serif', serif",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#c8892a")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(200,137,42,0.25)")}
                />
              </div> */}

              {/** Game mode choose */}
              <div className="flex flex-col gap-2">
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
                  Game Mode
                </span>
                <div className="flex gap-4">
                  {(["single", "multi"] as const).map((mode) => (
                    <label key={mode} className="flex items-center gap-2.5 cursor-pointer group">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center transition-all"
                        style={{
                          border: `2px solid ${gameMode === mode ? "#c8892a" : "rgba(200,137,42,0.3)"}`,
                          background: gameMode === mode ? "rgba(200,137,42,0.15)" : "transparent",
                        }}
                        onClick={() => setGameMode(mode)}>
                        {gameMode === mode && (
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#c8892a" }} />
                        )}
                      </div>
                      <input
                        type="radio"
                        className="sr-only"
                        name="gameMode"
                        value={mode}
                        checked={gameMode === mode}
                        onChange={() => setGameMode(mode)}
                      />
                      {/** Game mode label */}
                      <span
                        className="text-sm tracking-wider"
                        style={{
                          fontFamily: "'Cinzel', serif",
                          color: gameMode === mode ? "#f0e4c2" : "#8fa88a",
                        }}>
                        {mode === "single" ? "Single Player" : "Multiplayer"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/** Button list */}
            <div className="flex gap-3 mt-8">
              {/** Button close */}
              <input
                type="button"
                onClick={onClose}
                value="Close"
                className="flex-1 py-2.5 text-sm tracking-widest uppercase transition-colors"
                style={{
                  fontFamily: "'Cinzel', serif",
                  background: "transparent",
                  border: "1px solid rgba(143,168,138,0.3)",
                  color: "#8fa88a",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(143,168,138,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              />
              {/** Button submit */}
              <input
                type="submit"
                className="flex-1 py-2.5 text-sm tracking-widest uppercase transition-all hover:brightness-110"
                value="Enter"
                style={{
                  fontFamily: "'Cinzel', serif",
                  background: "linear-gradient(135deg, #c8892a, #a06a18)",
                  color: "#0b1a10",
                  fontWeight: 600,
                  borderRadius: "2px",
                  border: "none",
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

const styles: Record<string, React.CSSProperties> = {
  rootContainer: {
    background: "#0f1e14",
    border: "1px solid rgba(200,137,42,0.3)",
    borderRadius: "4px",
    boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
  },
};
