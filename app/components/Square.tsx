"use client";

// ----------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------
import { Square as SquareClass } from "@game/core/Square";
import { Piece as PieceClass } from "@/game/pieces/Piece";
import { PieceType, PlayerRole } from "@game/types";
import { useGameStore } from "@/hooks/useGame";
import { Move } from "@game/core/Move";
import { Game } from "@game/core/Game";

import { makeMove } from "@/lib/services";
// Import constant
import { getPlayerColor } from "@constants/colors";
import { BOARD } from "@constants/board";
import { ANIMALS } from "@constants/pieces";

// Import Icon
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Swords, WavesIcon, Crown, Fence } from "lucide-react";

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------
export default function Square({ square, role }: { square: SquareClass; role: PlayerRole }) {
  const { piece } = square;
  const { gameConfig, gameId, setGameConfig } = useGameStore();

  if (!gameConfig || !gameId) return <></>;

  // --------------------------------------------------------------------------
  // Derived state
  // --------------------------------------------------------------------------
  const selectedSquare = gameConfig.selectedSquare;
  const selectedPiece = selectedSquare ? gameConfig.board.squares[selectedSquare.row][selectedSquare.col].piece : null;

  const isCurrentPlayerPiece = selectedPiece?.player === role;

  const movable = isCurrentPlayerPiece
    ? gameConfig.movableSquares.find((movableSquare) => square.position.equal(movableSquare.to))
    : undefined;

  const isCapture = Boolean(movable && square.piece);
  const isSelected = selectedSquare?.equal(square.position) ?? false;

  // Last move boolean
  const isLastMoveFrom = gameConfig.lastMove?.from.equal(square.position) ?? null;
  const isLastMoveTo = gameConfig.lastMove?.to.equal(square.position) ?? null;
  const nextPlayer = Game.clone(gameConfig).getNextPlayer();

  const handleSquareClick = () => {
    // First click selects a piece.
    if (!selectedSquare) {
      setGameConfig(Game.clone(gameConfig).selectSquare(square.position).config);
      return;
    }

    // Execute the move when the clicked square is a legal destination.
    if (movable) {
      makeMove(gameId, gameConfig, new Move(selectedSquare, square.position));
      return;
    }

    // Clicking the selected piece again clears the selection.
    if (square.position.equal(selectedSquare)) {
      setGameConfig(Game.clone(gameConfig).unselectSquare().config);
      return;
    }

    // Otherwise select another piece.
    setGameConfig(Game.clone(gameConfig).selectSquare(square.position).config);
  };

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer select-non"
      style={{
        width: BOARD.CELL_SIZE,
        height: BOARD.CELL_SIZE,
        background: getCellBackground(square),
        outline: movable ? `2px solid ${isCapture ? "rgba(184,52,27,0.7)" : "rgba(200,137,42,0.55)"}` : undefined,
        outlineOffset: "-1px",
        transition: "background 0.1s",
      }}
      onClick={handleSquareClick}>
      {piece && <Piece piece={piece} select={isSelected} isCapture={isCapture} />}
      {!piece && <SquareLabel square={square} />}
      {movable && !piece && <MoveIndicator move={movable} />}
      {isLastMoveFrom && <LastMoveFromIndicator color={getPlayerColor(nextPlayer, 80)} />}
      {isLastMoveTo && <LastMoveToIndicator color={getPlayerColor(nextPlayer, 80)} />}
    </div>
  );
}

/**
 * Displays a game piece and its current visual state
 * (selected or capturable).
 */
function Piece({ piece, select, isCapture }: { piece: PieceClass; select: boolean; isCapture: boolean }) {
  const playerColor = getPlayerColor(piece.player);

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

/**
 * Renders label for special squares (den, river, trap)
 */
function SquareLabel({ square }: { square: SquareClass }) {
  let icon: React.ReactNode = <></>;

  switch (square.type) {
    case "den":
      icon = <Crown size={19} style={{ color: square.position.row === 0 ? "#e5383b" : "#00b4d8" }} />;
      break;
    case "river":
      icon = <WavesIcon size={19} style={{ color: "#023e8a" }} />;
      break;
    case "trap":
      icon = <Fence size={19} style={{ color: "#5c3324" }} />;
      break;
  }

  return <span className="absolute">{icon}</span>;
}

/**
 * Indicates a legal destination for the selected piece.
 */
function MoveIndicator({ move }: { move: Move }) {
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

/**
 * Renders a hollow marker at the origin of the last move.
 */
function LastMoveFromIndicator({ color }: { color: string }) {
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

/**
 * Renders a filled marker at the destination of the last move.
 */
function LastMoveToIndicator({ color }: { color: string }) {
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

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

/**
 * Returns the display icon for a piece type.
 */
export function getPieceIcon(type: PieceType) {
  return ANIMALS.find(({ name }) => name.toLowerCase() === type)?.symbol;
}

// ---- Cell background ------------------------------------------------------
function getCellBackground(square: SquareClass) {
  const { row, col } = square.position;

  switch (square.type) {
    case "den":
      return row === 0 ? getPlayerColor("player2", 80) : getPlayerColor("player1", 80);
    case "river":
      return "#0b1e40"; //"#023e8a"
    case "trap":
      return "#260701";
    default:
      return (row + col) % 2 === 0 ? "#1e3a26" : "#1a3322";
  }
}
