"use client";
import Modal, { ModalAccentLine, ModalTitle, ModalCard } from "./Modal";
import AppButton from "../button/AppButton";
import { useState } from "react";

type GameMode = "single" | "multi";

const GAME_MODES_OPTIONS = [
  {
    mode: "single",
    label: "Single Player",
  },
  {
    mode: "multi",
    label: "Multiplayer",
  },
] as const;

interface CreateGameModalProps {
  formAction: (formData: FormData) => void;
  onClose: () => void;
  open: boolean;
}

/**
 * Modal for creating a new game.
 */
export default function CreateGameModal({ formAction, open, onClose }: CreateGameModalProps) {
  const [gameMode, setGameMode] = useState<GameMode>("single");

  return (
    <Modal open={open} onClose={onClose}>
      <ModalCard className="w-full max-w-md relative">
        <ModalAccentLine />

        <div className="px-8 py-7">
          <ModalTitle title="Create Game" subtitle="Claim the Jungle" />

          {/* Game settings */}
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

              <GameModeSelector value={gameMode} onChange={setGameMode} />
            </div>

            <div className="flex gap-3 mt-8">
              <AppButton
                type="button"
                variant="secondary"
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(143,168,138,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                onClick={onClose}>
                Close
              </AppButton>

              <AppButton variant="primary" type="submit">
                Enter
              </AppButton>
            </div>
          </form>
        </div>
      </ModalCard>
    </Modal>
  );
}

/**
 * Radio group for selecting the game mode.
 */
function GameModeSelector({ value, onChange }: { value: string; onChange: (mode: GameMode) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
        Game Mode
      </span>
      <div className="flex gap-4">
        {GAME_MODES_OPTIONS.map(({ mode, label }) => (
          <label key={mode} className="flex items-center gap-2.5 cursor-pointer group">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center transition-all"
              style={{
                border: `2px solid ${value === mode ? "#c8892a" : "rgba(200,137,42,0.3)"}`,
                background: value === mode ? "rgba(200,137,42,0.15)" : "transparent",
              }}>
              {value === mode && <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#c8892a" }} />}
            </div>
            <input
              type="radio"
              className="sr-only"
              name="gameMode"
              value={mode}
              checked={mode === value}
              onChange={() => onChange(mode)}
            />
            <span
              className="text-sm tracking-wider"
              style={{
                fontFamily: "'Cinzel', serif",
                color: value === mode ? "#f0e4c2" : "#8fa88a",
              }}>
              {label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
