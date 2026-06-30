"use client";
import { PIECE_INFO } from "@context/pieceInfo";
import { ANIMALS, COLORS } from "@/app/game/page";
import { getPieceIcon } from "../../components/Square";
import { useGameStore } from "@/hooks/useGame";
import { useState } from "react";

// --- Piece Info Panel -----------------------
export default function PieceInfoPanel() {
  const game = useGameStore((state) => state.game);
  const [showInfo, setShowInfo] = useState(false);

  if (game === null) return <></>;

  let selectedPiece = null;

  if (game.selectedSquare !== null) {
    const square = game.board.squares[game.selectedSquare.row][game.selectedSquare.col];
    if (square.piece !== null) selectedPiece = square.piece;
  }

  const animal = ANIMALS.find((a) => a.name.toLowerCase() === selectedPiece?.type);
  const playerColor = selectedPiece?.player === 0 ? COLORS.P1_COLOR : COLORS.P2_COLOR;

  return (
    <>
      {/* Piece info toggle */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
          Piece Info
        </span>
        <button
          onClick={() => setShowInfo((v) => !v)}
          className="relative shrink-0"
          style={{ width: 38, height: 22 }}
          aria-label="Toggle piece info">
          <div
            className="absolute inset-0 rounded-full transition-colors duration-200"
            style={{ background: showInfo ? "rgba(200,137,42,0.55)" : "rgba(143,168,138,0.2)" }}
          />
          <div
            className="absolute top-0.5 w-4.5 h-4.5 rounded-full transition-all duration-200"
            style={{
              width: 18,
              height: 18,
              top: 2,
              left: showInfo ? 18 : 2,
              background: showInfo ? "#c8892a" : "#8fa88a",
              boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
            }}
          />
        </button>
      </div>

      {/** Piece detail card */}
      {showInfo && (
        <div
          className="p-4 rounded-sm"
          style={{ background: "#0f1e14", border: "1px solid rgba(200,137,42,0.2)", minHeight: 155 }}>
          {selectedPiece && animal ? (
            <div>
              {/** Animal info */}
              <div className="flex items-center gap-3 mb-3">
                <span style={{ fontSize: 34 }}>{getPieceIcon(selectedPiece.type)}</span>
                <div>
                  <div className="text-sm font-semibold" style={{ fontFamily: "'Cinzel', serif", color: "#f0e4c2" }}>
                    {selectedPiece.type}
                  </div>
                  <span
                    className="text-xs px-1.5 py-0.5 inline-block mt-0.5"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      background: `${playerColor})}22`,
                      border: `1px solid ${playerColor}44`,
                      color: playerColor,
                      borderRadius: "2px",
                      fontSize: "0.8rem",
                    }}>
                    Rank {animal.rank}
                  </span>
                </div>
              </div>
              {/** Animal's trait */}
              <div className="space-y-2.5">
                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-0.5"
                    style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
                    Movement
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "#a8c4a0" }}>
                    {PIECE_INFO[animal.rank].movement}
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-0.5"
                    style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
                    Special
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "#a8c4a0" }}>
                    {PIECE_INFO[animal.rank].special}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center" style={{ minHeight: 120 }}>
              {/** No selected piece */}
              <p className="text-xs text-center" style={{ fontFamily: "'Cinzel', serif", color: "#4a6350" }}>
                Select a piece to view its details
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
