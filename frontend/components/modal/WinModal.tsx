"use client";

import { PlayerNum } from "@shared/game/core/GameConfig";
import { RotateCcw, Home } from "lucide-react";
import { COLORS } from "@constants/colors";
import { useRouter } from "next/navigation";

interface WinModalProps {
  winner: PlayerNum;
}
export default function WinModal(props: WinModalProps) {
  const { winner } = props;
  const playerColor = winner === 0 ? COLORS.P1_COLOR : COLORS.P2_COLOR;
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(5,12,7,0.92)", backdropFilter: "blur(8px)" }}>
      <div
        className="w-full max-w-sm text-center"
        style={{
          background: "#0f1e14",
          border: `1px solid ${playerColor}55`,
          borderRadius: "4px",
          boxShadow: `0 24px 80px rgba(0,0,0,0.8), 0 0 60px ${playerColor}18`,
        }}>
        <div
          className="h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${playerColor}, transparent)` }}
        />

        {/** Hero title */}
        <div className="px-6 py-8">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="text-2xl mb-2" style={{ fontFamily: "'Cinzel Decorative', serif", color: "#f0e4c2" }}>
            Victory!
          </h2>
          <p
            className="text-sm tracking-widest uppercase mb-1"
            style={{ fontFamily: "'Cinzel', serif", color: playerColor }}>
            Player {winner + 1} Wins
          </p>
          <p className="text-xs mb-8" style={{ color: "#8fa88a" }}>
            The jungle bows to the victor.
          </p>

          {/** Button list */}
          <div className="flex gap-3">
            <button
              className="flex-1 py-2.5 text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-colors"
              style={{
                fontFamily: "'Cinzel', serif",
                background: "transparent",
                border: "1px solid rgba(143,168,138,0.3)",
                color: "#8fa88a",
                borderRadius: "2px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(143,168,138,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              <RotateCcw size={12} /> Play Again
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex-1 py-2.5 text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all hover:brightness-110"
              style={{
                fontFamily: "'Cinzel', serif",
                background:
                  winner === 0
                    ? "linear-gradient(135deg, #2a6ec8, #1a4a8a)"
                    : "linear-gradient(135deg, #c62a2a, #8a1a1a)",
                color: "#f0e4c2",
                fontWeight: 600,
                borderRadius: "2px",
                border: "none",
              }}>
              <Home size={12} /> Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
