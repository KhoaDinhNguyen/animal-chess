"use client";

import { useGameStore } from "@/hooks/useGame";

export default function GameIdPanel() {
  const gameId = useGameStore((s) => s.gameId);

  if (gameId === null) return <></>;

  return (
    <div
      className="flex items-center gap-2 px-4 py-2 mb-6 rounded-sm"
      style={{
        background: "#eeba0b10",
        border: "1px solid #ffe16925",
        maxWidth: "230px",
      }}>
      <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
        Game ID:
      </span>
      <code className="text-sm tracking-wider" style={{ fontFamily: "'Cinzel', serif", color: "#eeba0b" }}>
        {gameId}
      </code>
    </div>
  );
}
