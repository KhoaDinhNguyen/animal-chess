import { Board } from "../core/Board";
import { Position } from "../core/Position";
import { Piece } from "./Piece";

export class Mouse extends Piece {
  showMoves(board: Board, position: Position): Position[] {
    const [r, c] = [position.row, position.col];
    const [xAxis, yAxis] = [board.squares.length, board.squares[0].length];

    const moves: Position[] = [];

    if (r > 0) moves.push(new Position(r - 1, c));
    if (r < xAxis - 1) moves.push(new Position(r + 1, c));
    if (c > 0) moves.push(new Position(r, c - 1));
    if (c < yAxis - 1) moves.push(new Position(r, c + 1));

    return moves;
  }
}