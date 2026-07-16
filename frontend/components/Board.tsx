"use client";

import { Board as BoardClass } from "@game/core/Board";
import Square from "./Square";
import { COLORS } from "@constants/colors";
import { BOARD } from "@constants/board";
import PlayerStatus from "./PlayerStatus";
import { useGameChannel } from "@/hooks/useGameChannel";

interface BoardProps {
  board: BoardClass;
  role: string;
}

export default function Board(props: BoardProps) {
  const { board, role } = props;
  const { COLS_NUM, ROWS_NUM, CELL_SIZE } = BOARD;
  const player2Online = useGameChannel((s) => s.player2Online);
  const player1Online = useGameChannel((s) => s.player1Online);

  return (
    <div className="shrink-0">
      {/* P2 label */}
      <PlayerStatus player="player2" color={COLORS.P2_COLOR} online={player2Online} />

      {/** Grid */}
      <div
        className="mb-1"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS_NUM}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${ROWS_NUM}, ${CELL_SIZE}px)`,
          border: "2px solid rgba(200,137,42,0.35)",
          borderRadius: "3px",
          gap: "1px",
          background: "rgba(200,137,42,0.12)",
        }}>
        {board.squares.flatMap((row, rowIdx) =>
          row.map((square, colIdx) => <Square role={role} key={`${rowIdx}_${colIdx}`} square={square} />),
        )}
      </div>

      {/* P1 label */}
      <PlayerStatus player="player1" online={player1Online} color={COLORS.P1_COLOR} playerStatusPosition="right" />
    </div>
  );
}
