"use client";

import { Board as BoardClass } from "@/game/core/Board";
import Square from "./Square";

import styles from "./Board.module.css";
import { useGameStore } from "@/hooks/useGame";

interface BoardProps {
  board: BoardClass;
}

export default function Board(props: BoardProps) {
  const { board } = props;

  return (
    <div className={styles.board}>
      {board.squares.map((row, rowIdx) => (
        <div key={rowIdx} className={styles.row}>
          {row.map((square, colIdx) => (
            <Square key={`${rowIdx}_${colIdx}`} square={square} />
          ))}
        </div>
      ))}
    </div>
  );
}
