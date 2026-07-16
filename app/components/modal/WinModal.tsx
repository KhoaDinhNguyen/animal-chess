"use client";

import { PlayerRole } from "@game/types";
import { RotateCcw, Home } from "lucide-react";
import { COLORS } from "@constants/colors";
import { useRouter } from "next/navigation";
import Modal, { ModalAccentLine, ModalCard } from "./Modal";
import AppButton from "../button/AppButton";

interface WinModalProps {
  winner: PlayerRole;
}
export default function WinModal(props: WinModalProps) {
  const { winner } = props;
  const playerColor = winner === "player1" ? COLORS.P1_COLOR : COLORS.P2_COLOR;
  const router = useRouter();

  return (
    <Modal open={true}>
      <ModalCard
        className="w-full max-w-sm text-center"
        style={{
          border: `1px solid ${playerColor}55`,
          boxShadow: `0 24px 80px rgba(0,0,0,0.8), 0 0 60px ${playerColor}18`,
        }}>
        <ModalAccentLine style={{ background: `linear-gradient(90deg, transparent, ${playerColor}, transparent)` }} />

        <div className="px-6 py-8">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="text-2xl mb-2" style={{ fontFamily: "'Cinzel Decorative', serif", color: "#f0e4c2" }}>
            Victory!
          </h2>
          <p
            className="text-sm tracking-widest uppercase mb-1"
            style={{ fontFamily: "'Cinzel', serif", color: playerColor }}>
            {winner === "player1" ? "Player 1" : "Player 2"} Wins
          </p>
          <p className="text-xs mb-8" style={{ color: "#8fa88a" }}>
            The jungle bows to the victor.
          </p>

          <div className="flex gap-3">
            <AppButton variant="secondary" type="button">
              <RotateCcw size={12} /> Play Again
            </AppButton>

            <AppButton
              onClick={() => router.push("/")}
              type="button"
              variant="primary"
              style={{
                background:
                  winner === "player1"
                    ? "linear-gradient(135deg, #2a6ec8, #1a4a8a)"
                    : "linear-gradient(135deg, #c62a2a, #8a1a1a)",
              }}>
              <Home size={12} /> Return Home
            </AppButton>
          </div>
        </div>
      </ModalCard>
    </Modal>
  );
}
