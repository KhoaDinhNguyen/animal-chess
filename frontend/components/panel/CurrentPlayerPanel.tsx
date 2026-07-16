"use client";
import { useGameStore } from "@/hooks/useGame";
import { getPlayerColor } from "@constants/colors";

export default function CurrentPlayerPanel() {
  const playerTurn = useGameStore((state) => state.gameConfig.currentTurnPlayer);
  const currentPlayer = playerTurn === "player1" ? "1" : playerTurn === "player2" ? "2" : "";

  return (
    <div className="flex items-center justify-center gap-2 mt-1 px-0.5 mb-5">
      <div
        className="flex items-center gap-2 px-4 py-1.5 text-xs tracking-widest uppercase"
        style={{
          fontFamily: "'Cinzel', serif",
          background: `${getPlayerColor(playerTurn, 18)}`,
          border: `1px solid ${getPlayerColor(playerTurn, 80)}`,
          borderRadius: "2px",
          color: getPlayerColor(playerTurn),
        }}>
        <div className="w-2 h-2 rounded-full" style={{ background: getPlayerColor(playerTurn) }} />
        Player {currentPlayer}&apos;s Turn
      </div>
    </div>
  );
}
