"use client";

import { useClipboard } from "@/hooks/useClipboard";
import { useGameStore } from "@/hooks/useGame";
import { Link2, Check, Copy } from "lucide-react";
import AppButton from "../button/AppButton";
import { useEffect, useState } from "react";

export default function GameIdPanel() {
  const [url, setUrl] = useState("");
  const gameId = useGameStore((s) => s.gameId);

  useEffect(() => {
    setUrl(window.location.href);
  }, [gameId]);

  if (gameId === null) return <></>;

  return (
    <div className="flex flex-col gap-2" style={{ width: 230, minWidth: 200 }}>
      <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
        Game Invitation
      </span>
      <ClipboardButton label="Copy Game ID" value={gameId} icon={<Copy size={11} />} suffix="Game ID" />
      <ClipboardButton label="Copy Game Link" value={url} icon={<Link2 size={11} />} suffix="URL" />
    </div>
  );
}

interface ClipboardButtonProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  suffix: string;
}
function ClipboardButton({ label, value, icon, suffix }: ClipboardButtonProps) {
  const [copied, handleCopy] = useClipboard();

  return (
    <AppButton
      variant="primary"
      type="button"
      onClick={() => handleCopy(value)}
      className="flex items-center justify-between w-full px-3 py-2 text-xs"
      onMouseEnter={(e) => (e.currentTarget.style.background = "#a06a18")}
      onMouseLeave={(e) => (e.currentTarget.style.background = copied ? "#a06a18" : "#c8892a")}
      style={{ color: "#fff", fontWeight: "normal" }}>
      <span className="flex items-center gap-1.5">
        {icon} {label}
      </span>
      {copied ? (
        <Check size={11} />
      ) : (
        <div>
          <span style={{ opacity: 0.65, fontSize: "0.6rem" }}>{suffix}</span>
        </div>
      )}
    </AppButton>
  );
}
