"use client";
import { PIECE_INFO } from "@/constants/pieces";
import { getPlayerColor } from "@constants/colors";
import { ANIMALS } from "@constants/pieces";
import { getPieceIcon } from "../../components/Square";
import { useGameStore } from "@/hooks/useGame";
import { useState } from "react";
import { Piece } from "@/game/pieces/Piece";

/* Display the selected piece's abilities. */
export default function PieceInfoPanel() {
  const gameConfig = useGameStore((state) => state.gameConfig);
  const [showInfo, setShowInfo] = useState(false);

  if (gameConfig === null) return <></>;

  let selectedPiece =
    gameConfig.selectedSquare &&
    gameConfig.board.squares[gameConfig.selectedSquare.row][gameConfig.selectedSquare.col].piece;

  const animal = selectedPiece && ANIMALS.find((a) => a.name.toLowerCase() === selectedPiece.type);

  return (
    <>
      {/* Hidden until the player enables the information panel. */}
      <ToggleButton isOn={showInfo} onClick={() => setShowInfo((v) => !v)} />

      {showInfo && (
        <div
          className="p-4 rounded-sm"
          style={{ background: "#0f1e14", border: "1px solid rgba(200,137,42,0.2)", minHeight: 155 }}>
          {animal ? (
            <PieceInfo piece={selectedPiece} rank={animal.rank} />
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

// Turns on or off regarding piece info
function ToggleButton({ onClick, isOn }: { isOn: boolean; onClick: () => void }) {
  return (
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
        Piece Info
      </span>
      <button
        onClick={onClick}
        className="relative shrink-0"
        style={{ width: 38, height: 22 }}
        aria-label="Toggle piece info">
        <div
          className="absolute inset-0 rounded-full transition-colors duration-200"
          style={{ background: isOn ? "rgba(200,137,42,0.55)" : "rgba(143,168,138,0.2)" }}
        />
        <div
          className="absolute top-0.5 w-4.5 h-4.5 rounded-full transition-all duration-200"
          style={{
            width: 18,
            height: 18,
            top: 2,
            left: isOn ? 18 : 2,
            background: isOn ? "#c8892a" : "#8fa88a",
            boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
          }}
        />
      </button>
    </div>
  );
}
function PieceInfo({ piece, rank }: { piece: Piece; rank: number }) {
  const playerColor = piece && getPlayerColor(piece.player);

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <span style={{ fontSize: 34 }}>{getPieceIcon(piece.type)}</span>
        <div>
          <div className="text-sm font-semibold" style={{ fontFamily: "'Cinzel', serif", color: "#f0e4c2" }}>
            {piece.type}
          </div>
          <span
            className="text-xs px-1.5 py-0.5 inline-block mt-0.5"
            style={{
              fontFamily: "'Cinzel', serif",
              background: `${playerColor}22`,
              border: `1px solid ${playerColor}44`,
              color: playerColor ?? "transparent",
              borderRadius: "2px",
              fontSize: "0.8rem",
            }}>
            Rank {rank}
          </span>
        </div>
      </div>
      {/** Animal's trait */}
      <div className="space-y-2.5">
        <InfoSection rank={rank} title="movement" />
        <InfoSection rank={rank} title="special" />
      </div>
    </div>
  );
}

function InfoSection({ title, rank }: { title: "special" | "movement"; rank: number }) {
  return (
    <div>
      <p
        className="text-xs tracking-widest uppercase mb-0.5"
        style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
        {title}
      </p>
      <p className="text-xs leading-relaxed" style={{ color: "#a8c4a0" }}>
        {PIECE_INFO[rank][title]}
      </p>
    </div>
  );
}
