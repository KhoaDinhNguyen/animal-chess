"use client";

import { Square as SquareClass } from "@game/core/Square";
import { Piece as PieceClass, PieceType } from "@game/pieces/Piece";
import { useGameStore } from "@/hooks/useGame";
import { Move } from "@game/core/Move";
import { Game } from "@game/core/Game";

import { makeMove } from "@/lib/services";
// Import constant
import { COLORS } from "@constants/colors";
import { BOARD } from "@constants/board";
import { ANIMALS } from "@constants/pieces";

// Import Icon
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Swords, WavesIcon, Crown, Fence } from "lucide-react";

export default function Square({ square, role }: { square: SquareClass; role: string }) {
  const { piece } = square;

  // Handle action
  const gameConfig = useGameStore((state) => state.gameConfig);
  const setGameConfig = useGameStore((s) => s.setGameConfig);
  const gameId = useGameStore((s) => s.gameId);

  if (!gameConfig || !gameId) return <></>;

  // Find moveable square
  const selectedPiece = gameConfig.selectedSquare
    ? gameConfig.board.squares[gameConfig.selectedSquare.row][gameConfig.selectedSquare.col].piece
    : null;

  const isRightPlayer = selectedPiece
    ? (selectedPiece.player === 1 && role === "player1") || (selectedPiece.player === 2 && role === "player2")
    : false;

  const moveable = isRightPlayer
    ? gameConfig.moveableSquares.find((movableSquare) => square.position.equal(movableSquare.to))
    : undefined;

  const isCapture = moveable !== undefined && square.piece !== null;

  const isLastMoveFrom = gameConfig.lastMove
    ? square.position.col === gameConfig.lastMove.from.col && square.position.row === gameConfig.lastMove.from.row
    : null;

  const isLastMoveTo = gameConfig.lastMove
    ? square.position.col === gameConfig.lastMove.to.col && square.position.row === gameConfig.lastMove.to.row
    : null;

  if (isLastMoveFrom) {
    console.log(square.position, isLastMoveFrom);
  }
  const onClickSquare = async () => {
    const selected = gameConfig.selectedSquare;

    /** If the game selected square is null, select it */
    if (selected === null) {
      setGameConfig(Game.clone(gameConfig).selectSquare(square.position).config);
      return;
    }

    /** If the game selected square is not null, and it is movable, then move it */
    if (moveable !== undefined) {
      makeMove(gameId, gameConfig, new Move(selected, square.position));
      return;
    }

    if (square.position.equal(selected)) {
      /** If the selected square is the current position, unselect it */
      setGameConfig(Game.clone(gameConfig).unselectSquare().config);
      return;
    }

    setGameConfig(Game.clone(gameConfig).selectSquare(square.position).config);
  };

  const isSelected = gameConfig.selectedSquare === null ? false : gameConfig.selectedSquare.equal(square.position);

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer select-non"
      style={{
        width: BOARD.CELL_SIZE,
        height: BOARD.CELL_SIZE,
        background: getCellBg(square),
        outline: moveable ? `2px solid ${isCapture ? "rgba(184,52,27,0.7)" : "rgba(200,137,42,0.55)"}` : undefined,
        outlineOffset: "-1px",
        transition: "background 0.1s",
      }}
      onClick={onClickSquare}>
      {!piece && <SquareLabel square={square} />}
      {piece && <Piece piece={piece} select={isSelected} isCapture={isCapture} />}
      {moveable && !piece && <MoveDirection move={moveable} />}
      {isLastMoveFrom && (
        <LastPositionFrom color={gameConfig.player === 1 ? `${COLORS.P2_COLOR}80` : `${COLORS.P1_COLOR}80`} />
      )}
      {isLastMoveTo && (
        <LastPositionTo color={gameConfig.player === 1 ? `${COLORS.P2_COLOR}80` : `${COLORS.P1_COLOR}80`} />
      )}
    </div>
  );
}

// --- Square component ---------------------------
function SquareLabel({ square }: { square: SquareClass }) {
  let label = <></>;

  switch (square.type) {
    case "den":
      label = <Crown size={19} style={{ color: square.position.row === 0 ? "#e5383b" : "#00b4d8" }} />;
      break;
    case "river":
      label = <WavesIcon size={19} style={{ color: "#023e8a" }} />;
      break;
    case "trap":
      label = <Fence size={19} style={{ color: "#5c3324" }} />;
      break;
  }

  return <span className="absolute">{label}</span>;
}
// --- Piece component ---------------------------
function Piece({ piece, select, isCapture }: { piece: PieceClass; select: boolean; isCapture: boolean }) {
  const playerColor = piece.player === 1 ? COLORS.P1_COLOR : COLORS.P2_COLOR;

  return (
    <div
      className="relative flex items-center justify-center rounded-full transition-all duration-150 select-none"
      style={{
        width: BOARD.CELL_SIZE - 8,
        height: BOARD.CELL_SIZE - 8,
        background: `${playerColor}50`,
        border: select
          ? `2px solid ${playerColor}`
          : isCapture
            ? "2px solid rgba(184,52,27,0.75)"
            : `1px solid ${playerColor}55`,
        fontSize: BOARD.CELL_SIZE * 0.44,
        lineHeight: 1,
        boxShadow: select ? `0 0 14px ${playerColor}70` : "none",
        transform: select ? "scale(1.08)" : "scale(1)",
      }}>
      {getPieceIcon(piece.type)}

      {/* Capture overlay on opponent pieces */}
      {isCapture && (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-full"
          style={{ background: "rgba(184,52,27,0.18)" }}>
          <Swords size={13} style={{ color: "#e05040", position: "absolute", bottom: 2, right: 2 }} />
        </div>
      )}
    </div>
  );
}

// --- Arrow component -----------------------------
function MoveDirection({ move }: { move: Move }) {
  const { dr, dc } = move;

  return (
    <div className="z-20">
      {dr === -1 && <ArrowUp size={19} style={{ color: "rgba(200,137,42,0.9)" }} />}
      {dr === 1 && <ArrowDown size={19} style={{ color: "rgba(200,137,42,0.9)" }} />}
      {dc === -1 && dr === 0 && <ArrowLeft size={19} style={{ color: "rgba(200,137,42,0.9)" }} />}
      {dc === 1 && dr === 0 && <ArrowRight size={19} style={{ color: "rgba(200,137,42,0.9)" }} />}
    </div>
  );
}

// --- Last Position From -------------------------
function LastPositionFrom({ color }: { color: string }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Hollow ring — "departed from here" */}
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          border: `2.5px solid ${color}`,
          background: "transparent",
          boxShadow: `0 0 6px ${color}90`,
        }}
      />
    </div>
  );
}

/// ---- Last Position To --------------------------
function LastPositionTo({ color }: { color: string }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Filled dot — "landed here" */}
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: `${color}`,
          boxShadow: "0 0 8px rgba(251,191,36,0.6), 0 0 2px rgba(251,191,36,1)",
        }}
      />
    </div>
  );
}
/// ---- Piece icon ------------------------------
export function getPieceIcon(type: PieceType) {
  for (const item of ANIMALS) {
    if (item.name.toLowerCase() === type) return item.symbol;
  }
}

// ---- Cell background ------------------------------------------------------
function getCellBg(square: SquareClass) {
  const [r, c] = [square.position.row, square.position.col];

  if (square.type === "den") {
    if (r == 0) return `${COLORS.P2_COLOR}80`;
    return `${COLORS.P1_COLOR}80`;
  } else if (square.type === "river")
    return "#0b1e40"; //"#023e8a"
  else if (square.type === "trap") return "#260701";

  return (r + c) % 2 === 0 ? "#1e3a26" : "#1a3322";
}

// ---- Style ------------------------------------------------------
