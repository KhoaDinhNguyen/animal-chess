"use client";

import { useClipBoard } from "@/hooks/useClipboard";
import { useGameStore } from "@/hooks/useGame";
import { Link2, Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export default function GameIdPanel() {
  const gameId = useGameStore((s) => s.gameId);

  if (gameId === null) return <></>;

  return (
    <div className="flex flex-col gap-2" style={{ width: 230, minWidth: 200 }}>
      <GameIdButton gameId={gameId} />
      <GameURLButton gameId={gameId} />
    </div>
  );
}

/** Clipboard GameID */
function GameIdButton({ gameId }: { gameId: string }) {
  const [copied, handleCopy] = useClipBoard();

  return (
    <button
      onClick={() => handleCopy(gameId)}
      className="flex items-center justify-between w-full px-3 py-2 text-xs tracking-widest uppercase transition-all"
      style={{
        fontFamily: "'Cinzel', serif",
        background: copied ? "#a06a18" : "#c8892a",
        border: "none",
        color: "#ffffff",
        borderRadius: "2px",
        boxShadow: "0 2px 8px rgba(200,137,42,0.3)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#a06a18")}
      onMouseLeave={(e) => (e.currentTarget.style.background = copied ? "#a06a18" : "#c8892a")}>
      <span className="flex items-center gap-1.5">
        <Copy size={11} />
        Copy Game ID
      </span>
      {copied ? (
        <Check size={11} style={{ color: "#ffffff" }} />
      ) : (
        <div>
          <span style={{ opacity: 0.65, fontSize: "0.6rem" }}>GameID</span>
        </div>
      )}
    </button>
  );
}

/** Clipboard GameURL */
function GameURLButton({ gameId }: { gameId: string }) {
  const [url, setUrl] = useState("");
  const [copied, handleCopy] = useClipBoard();

  useEffect(() => {
    setUrl(window.location.href);
  }, [gameId]);

  return (
    <button
      onClick={() => handleCopy(url)}
      className="flex items-center justify-between w-full px-3 py-2 text-xs tracking-widest uppercase transition-all"
      style={{
        fontFamily: "'Cinzel', serif",
        background: copied ? "#a06a18" : "#c8892a",
        border: "none",
        color: "#ffffff",
        borderRadius: "2px",
        boxShadow: "0 2px 8px rgba(200,137,42,0.3)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#a06a18")}
      onMouseLeave={(e) => (e.currentTarget.style.background = copied ? "#a06a18" : "#c8892a")}>
      <span className="flex items-center gap-1.5">
        <Link2 size={11} />
        Copy Game Link
      </span>
      {copied ? (
        <Check size={11} style={{ color: "#ffffff" }} />
      ) : (
        <div>
          <span style={{ opacity: 0.65, fontSize: "0.6rem" }}>URL</span>
        </div>
      )}
    </button>
  );
}
