"use client";

import { Board as BoardClass } from "@shared/game/core/Board";
import Square from "./Square";
import { COLORS } from "@constants/colors";
import { BOARD } from "@constants/board";

interface BoardProps {
  board: BoardClass;
  role: string;
}

export default function Board(props: BoardProps) {
  const { board, role } = props;
  const { COLS_NUM, ROWS_NUM, CELL_SIZE } = BOARD;

  return (
    <div className="shrink-0">
      {/* P2 label */}
      <div className="flex items-center gap-2 mb-1 px-0.5">
        <div className="w-2 h-2 rounded-full" style={{ background: COLORS.P2_COLOR }} />
        <span
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: "'Cinzel', serif", color: COLORS.P2_COLOR, opacity: 0.8 }}>
          Player 2
        </span>
      </div>

      {/** Grid */}
      <div
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
      <div className="flex items-center justify-end gap-2 mt-1 px-0.5">
        <span
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: "'Cinzel', serif", color: COLORS.P1_COLOR, opacity: 0.8 }}>
          Player 1
        </span>
        <div className="w-2 h-2 rounded-full" style={{ background: COLORS.P1_COLOR }} />
      </div>
    </div>
  );
}
