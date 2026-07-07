"use client";

import { Square as SquareClass } from "@shared/game/core/Square";
import { Piece as PieceClass, PieceType } from "@shared/game/pieces/Piece";
import { useGameStore } from "@/hooks/useGame";
import { Move } from "@shared/game/core/Move";
import { Game } from "@shared/game/core/Game";

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
  // console.log(
  //   (piece?.player === 0 && role === "player1") || (piece?.player === 1 && role === "player2"),
  //   role,
  //   piece?.player,
  //   gameConfig.moveableSquares,
  //   gameConfig.moveableSquares.find((movableSquare) => square.position.equal(movableSquare.to)),
  // );
  const selectedPiece = gameConfig.selectedSquare
    ? gameConfig.board.squares[gameConfig.selectedSquare.row][gameConfig.selectedSquare.col].piece
    : null;

  const isRightPlayer = selectedPiece
    ? (selectedPiece.player === 0 && role === "player1") || (selectedPiece.player === 1 && role === "player2")
    : false;

  const moveable = isRightPlayer
    ? gameConfig.moveableSquares.find((movableSquare) => square.position.equal(movableSquare.to))
    : undefined;

  const isCapture = moveable !== undefined && square.piece !== null;

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
  const playerColor = piece.player === 0 ? COLORS.P1_COLOR : COLORS.P2_COLOR;

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
