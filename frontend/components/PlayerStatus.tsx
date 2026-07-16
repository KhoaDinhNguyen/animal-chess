"use client";

import { COLORS } from "@constants/colors";
import { useGameStore } from "@/hooks/useGame";
import WaitingTurnIndicator from "./WaitingTurnIndicator";
import { PlayerRole } from "@game/types";

interface PlayerStatusProps {
  player: PlayerRole;
  online: boolean;
  color: string;
  align?: "left" | "right";
}

export default function PlayerStatus({ player, online, color, align = "left" }: PlayerStatusProps) {
  const gameConfig = useGameStore((state) => state.gameConfig);
  const currentPlayer = gameConfig.currentTurnPlayer;
  const gameMode = gameConfig.mode;
  const statusColor = online || (player === "player2" && gameMode === "single") ? color : COLORS.OFFLINE_COLOR;
  const isWaiting = currentPlayer === player;

  return (
    <div className={`flex items-center justify-between mb-1 px-0.5 ${align === "right" ? "flex-row-reverse" : ""}`}>
      <div className="flex items-center gap-2 py-0.5 border border-transparent">
        <div className={`flex items-center gap-2 px-0.5 ${align === "right" ? "justify-end" : ""}`}>
          <div className="w-2 h-2 rounded-full" style={{ background: statusColor }} />

          <span
            className="text-xs tracking-widest uppercase py-0"
            style={{ fontFamily: "'Cinzel', serif", color: statusColor }}>
            {player === "player1" ? "Player 1" : "Player 2"}
            {!online && gameMode === "multi" && " (Offline)"}
            {gameMode === "single" && player === "player2" && " (Bot)"}
          </span>
        </div>
      </div>
      {isWaiting && <WaitingTurnIndicator />}
    </div>
  );
}
