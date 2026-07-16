"use client";

import { Board as BoardClass } from "@game/core/Board";
import Square from "./Square";
import { COLORS } from "@constants/colors";
import { BOARD } from "@constants/board";
import PlayerStatus from "./PlayerStatus";
import { useGameChannel } from "@/hooks/useGameChannel";
import { PlayerRole } from "@game/types";

interface BoardProps {
  board: BoardClass;
  role: PlayerRole;
}

export default function Board(props: BoardProps) {
  const { board, role } = props;
  const { player1Online, player2Online } = useGameChannel();

  return (
    <div className="shrink-0">
      <PlayerStatus player="player2" color={COLORS.P2_COLOR} online={player2Online} />

      <div className="mb-1" style={boardStyle}>
        {board.squares.flatMap((row, rowIdx) =>
          row.map((square, colIdx) => <Square role={role} key={`${rowIdx}_${colIdx}`} square={square} />),
        )}
      </div>

      <PlayerStatus player="player1" online={player1Online} color={COLORS.P1_COLOR} align="right" />
    </div>
  );
}

const boardStyle = {
  display: "grid",
  gridTemplateColumns: `repeat(${BOARD.COLS_NUM}, ${BOARD.CELL_SIZE}px)`,
  gridTemplateRows: `repeat(${BOARD.ROWS_NUM}, ${BOARD.CELL_SIZE}px)`,
  border: "2px solid rgba(200,137,42,0.35)",
  borderRadius: "3px",
  gap: "1px",
  background: "rgba(200,137,42,0.12)",
};
