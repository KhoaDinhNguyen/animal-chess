"use client";

import { SquareType, Square as SquareClass } from "@/game/core/Square";
import { PieceType } from "@/game/pieces/Piece";
import { MouseIcon } from "@/public/pieces/Mouse";
import { ElephantIcon } from "@/public/pieces/Elephant";
import { useGameStore } from "@/hooks/useGame";

// Import styles
import styles from "./Square.module.css";
import { LionIcon } from "@/public/pieces/Lion";
import { TigerIcon } from "@/public/pieces/Tiger";
import { LeopardIcon } from "@/public/pieces/Leopard";
import { DogIcon } from "@/public/pieces/Dog";
import { WolfIcon } from "@/public/pieces/Wolf";
import { CatIcon } from "@/public/pieces/Cat";

interface SquareProps {
  square: SquareClass;
}

export default function Square(props: SquareProps) {
  const { square } = props;
  const { piece } = square;

  // Handle action
  const selectSquare = useGameStore((state) => state.selectSquare);
  const move = useGameStore((state) => state.move);
  const game = useGameStore((state) => state.game);

  let isMovable = game.moveableSquares.some((moveableSquare) => {
    return moveableSquare.col == square.position.col && moveableSquare.row == square.position.row;
  });

  const onClickSquare = () => {
    if (isMovable && game.selectedSquare) {
      move(game.selectedSquare, square.position);
    } else {
      selectSquare(square.position);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        border: "1px dashed black",
        background: getBackgroundColor(square.type),
        cursor: piece !== null ? "pointer" : "default",
        position: "relative",
      }}
      onClick={onClickSquare}>
      {piece !== null && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            background: square.piece?.player == 0 ? "blue" : "red",
            borderRadius: "100px",
            width: "80%",
            height: "80%",
          }}>
          {getPieceIcon(piece.type)}
        </div>
      )}
      {isMovable && <div className={styles.moveableSquare}></div>}
    </div>
  );
}

function getBackgroundColor(type: SquareType) {
  switch (type) {
    case "plain":
      return "#40916c";
    case "river":
      return "#00a6fb";
    case "trap":
      return "#9d6b53";
    case "den":
      return "#ffff3f";
    default:
      return "";
  }
}

function getPieceIcon(type: PieceType) {
  switch (type) {
    case "mouse":
      return MouseIcon();
    case "elephant":
      return ElephantIcon();
    case "lion":
      return LionIcon();
    case "tiger":
      return TigerIcon();
    case "leopard":
      return LeopardIcon();
    case "wolf":
      return WolfIcon();
    case "dog":
      return DogIcon();
    case "cat":
      return CatIcon();
    default:
      return <></>;
  }
}
