"use client";
import { useGameStore } from "@/hooks/useGame";
import { COLORS } from "@constants/colors";

export default function CurrentPlayerPanel() {
  const playerTurn = useGameStore((state) => state.gameConfig.currentTurnPlayer);

  const turnColor = playerTurn === "player1" ? COLORS.P1_COLOR : COLORS.P2_COLOR;

  const playerName = (p1: string, p2: string) => {
    if (playerTurn === undefined) return "";
    if (playerTurn === "player1") return p1;
    else return p2;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-1 px-0.5 mb-5">
      {/* Current player */}
      <div
        className="flex items-center gap-2 px-4 py-1.5 text-xs tracking-widest uppercase"
        style={{
          fontFamily: "'Cinzel', serif",
          background: `${turnColor}18`,
          border: `1px solid ${turnColor}80`,
          borderRadius: "2px",
          color: turnColor,
        }}>
        <div className="w-2 h-2 rounded-full" style={{ background: turnColor }} />
        Player {playerName("1", "2")}&apos;s Turn
      </div>
    </div>
  );
}
