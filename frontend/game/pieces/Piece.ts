import { Game, PlayerNum } from "../core/Game";
import { Position } from "../core/Position";
import { Square } from "../core/Square";
import { TRAPS, DENS } from "../core/Board";

export type PieceType = "mouse" | "elephant" | "dog"

export abstract class Piece {
  public type: PieceType;
  public player: PlayerNum;
  public directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]

  constructor(player: PlayerNum) {
    this.player = player;
    this.type = "mouse";
  }

  showMoves(game: Game, position: Position): Position[] {
    const board = game.board;
    const [r, c] = [position.row, position.col];
    const [xAxis, yAxis] = [board.squares.length, board.squares[0].length];

    const moves: Position[] = [];

    for (const dir of this.directions) {
      const nextR = r + dir[0], nextC = c + dir[1];
      if (nextR < 0 || nextR >= xAxis || nextC < 0 || nextC >= yAxis) continue;

      const square = board.squares[nextR][nextC];

      // dens
      if (square.type === "den") {
        if (this.canMoveDen(square, game.player)) moves.push(new Position(nextR, nextC));
      }
      else if (square.type === "trap") {
        if (this.canMoveTrap(square, game.player)) moves.push(new Position(nextR, nextC));
      }
      else if (square.type === "river") {
        if (this.canMoveRiver(square, game.player)) moves.push(new Position(nextR, nextC));
      }
      else {
        // Plain field
        console.log(square.piece);
        if (square.piece === null) {
          moves.push(new Position(nextR, nextC));
        }
        else {
          console.log(square.piece.player, game.player);
          if (square.piece.player == game.player) continue;
          else if (this.canCapture(square.piece)) moves.push(new Position(nextR, nextC));
        }
      }

    }

    return moves;
  }

  /**
   * Every animals have the same den moves
   * @param square the examined square
   * @param player the current player
   * @returns true if the animal can enter a den
   */
  canMoveDen(square: Square, player: PlayerNum): boolean {
    if (square.type !== "den") return false;

    const denOwner = DENS.slice(0, 1).some(([r, c]) => square.position.row == r && square.position.col == c) ? 0 : 1;

    console.log(denOwner, player, "Den");
    return denOwner !== player; // Animals can only enter opponent's den
  }

  /**
   * Every animals have the same trap moves
   * @param square the examined square
   * @param player the current player
   * @returns true if the animal can enter a trap
   */
  canMoveTrap(square: Square, player: PlayerNum): boolean {
    if (square.type !== "trap") return false;
    else if (square.piece == null) return true; // If the trap is empty, any animals can enter it

    const trapOwner = TRAPS.slice(0, 3).some(([r, c]) => square.position.row == r && square.position.col == c) ? 0 : 1;

    // If the trap is nonempty, then a trap must be from the current player and it must be opponent's piece
    return trapOwner === player && square.piece.player !== player;
  }

  abstract canCapture(piece: Piece): boolean;
  abstract canMoveRiver(square: Square, player: PlayerNum): boolean;
}