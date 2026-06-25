import { Game, PlayerNum } from "../core/Game";
import { Position } from "../core/Position";
import { Square } from "../core/Square";
import { TRAPS, DENS } from "../core/Board";
import { Move } from "../core/Move";


export type PieceType = "mouse" | "elephant" | "lion" | "tiger" | "leopard" | "wolf" | "dog" | "cat"

export abstract class Piece {
  public type: PieceType;
  public player: PlayerNum;
  public static directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]

  constructor(player: PlayerNum) {
    this.player = player;
    this.type = "mouse";
  }

  showMoves(game: Game, position: Position): Move[] {
    const board = game.board;
    const [r, c] = [position.row, position.col];
    const [xAxis, yAxis] = [board.squares.length, board.squares[0].length];

    const moves: Move[] = [];

    for (const dir of Piece.directions) {
      const [nextR, nextC] = [r + dir[0], c + dir[1]];
      if (nextR < 0 || nextR >= xAxis || nextC < 0 || nextC >= yAxis) continue;

      const square = board.squares[nextR][nextC];

      // Check if the next square is moveable to den, trap, river, and plain
      if (this.canMoveToDen(square, game.player)) moves.push(new Move(position, new Position(nextR, nextC)));
      if (this.canMoveToTrap(square, game.player)) moves.push(new Move(position, new Position(nextR, nextC)));
      if (this.canMoveToRiver(square, game.player)) moves.push(new Move(position, new Position(nextR, nextC)));
      if (this.canMoveToPlain(board.squares[r][c], square, game.player)) moves.push(new Move(position, new Position(nextR, nextC)));
    }

    // Jump moves for tiger and lions
    const jumpMoves = this.canJump(board.squares[r][c], game);
    for (const newPosition of jumpMoves) moves.push(new Move(position, newPosition));

    return moves;
  }


  /**
   * Every animals have the same plain moves
   * @param targetSquare the examined square
   * @param player the current player
   * @returns true if the animal can enter a plain
   */
  canMoveToPlain(currentSquare: Square, targetSquare: Square, player: PlayerNum): boolean {
    if (targetSquare.type !== "plain") return false;
    if (targetSquare.piece == null) return true;
    if (targetSquare.piece.player == player) return false;
    if (currentSquare.type === "river" && targetSquare.piece.type === "elephant") return false;

    return this.canCapture(targetSquare.piece);
  }
  /**
   * Every animals have the same den moves
   * @param targetSquare the examined square
   * @param player the current player
   * @returns true if the animal can enter a den
   */
  canMoveToDen(targetSquare: Square, player: PlayerNum): boolean {
    if (targetSquare.type !== "den") return false;

    const denOwner = DENS.slice(0, 1).some(([r, c]) => targetSquare.position.row == r && targetSquare.position.col == c) ? 0 : 1;

    return denOwner !== player; // Animals can only enter opponent's den
  }

  /**
   * Every animals have the same trap moves
   * @param targetSquare the examined square
   * @param player the current player
   * @returns true if the animal can enter a trap
   */
  canMoveToTrap(targetSquare: Square, player: PlayerNum): boolean {
    if (targetSquare.type !== "trap") return false;
    else if (targetSquare.piece == null) return true; // If the trap is empty, any animals can enter it
    else if (targetSquare.piece.player == player) return false; // If the trap is occupied by allies, can not enter

    const trapOwner = TRAPS.slice(0, 3).some(([r, c]) => targetSquare.position.row == r && targetSquare.position.col == c) ? 0 : 1;

    // If the trap is nonempty, then a trap must be from the current player or it can capture the animal inside the trap
    return this.canCapture(targetSquare.piece) || trapOwner == player;
  }

  /**
   * Only mouse can move to river
   * @param targetSquare the examined square
   * @param player the current player
   * @returns true if the animal can enter a river
   */
  canMoveToRiver(targetSquare: Square, player: PlayerNum): boolean {
    if (targetSquare.type != "river") return false;
    if (this.type !== "mouse") return false;
    if (targetSquare.piece == null) return true; // If the river is empty, enter it

    return false;
  }

  canJump(square: Square, game: Game): Position[] {
    if (this.type !== "lion" && this.type !== "tiger") return [];

    const [row, col] = [square.position.row, square.position.col];
    const jumpMoves: Position[] = [];
    const squares = game.board.squares;

    // Check vertical jump
    const verticalJumpTop = VERTICAL_JUMP_TOP.some(([r, c]) => row == r && col == c);
    const verticalJumpBottom = VERTICAL_JUMP_BOTTOM.some(([r, c]) => row == r && col == c);

    // Check horizontal jump
    const horizontalJumpLeft = HORIZONTAL_JUMP_LEFT.some(([r, c]) => row == r && col == c);
    const horizontalJumpRight = HORIZONTAL_JUMP_MIDDLE.some(([r, c]) => row == r && col == c);
    const horizontalJumpMiddle = HORIZONTAL_JUMP_RIGHT.some(([r, c]) => row == r && col == c);

    let directions: number[][] = [];

    if (verticalJumpTop) directions = [[4, 0]];
    if (verticalJumpBottom) directions = [[-4, 0]];
    if (horizontalJumpLeft) directions = [[0, 3]];
    if (horizontalJumpMiddle) directions = [[0, 3], [0, -3]];
    if (horizontalJumpRight) directions = [[0, -3]];

    const jumpVertical = (verticalJumpTop || verticalJumpBottom) ? true : false;

    // For each direction, check movable squares
    for (const dir of directions) {
      // Target square
      const [nextR, nextC] = [row + dir[0], col + dir[1]];
      let haveMouseInRiver = false;

      const [start, end] = jumpVertical ? [row, nextR] : [col, nextC];
      const step = Math.sign(end - start);

      // Check whether if there is a mouse in river
      for (let i = start + step; i !== end; i += step) {
        haveMouseInRiver = haveMouseInRiver || ((jumpVertical ? squares[i][nextC].piece : squares[nextR][i].piece) !== null)
      }

      // If there is a mouse, then cannot jump
      if (haveMouseInRiver) continue;

      const targetSquare = squares[nextR][nextC];

      // If the target square has ally's piece, cannot jump
      if (targetSquare.piece !== null && targetSquare.piece.player === game.player) continue;

      // If the target square has opponent's piece, cannot jump if the jump piece cannot capture target piece
      if (targetSquare.piece !== null && targetSquare.piece.player !== game.player && !this.canCapture(targetSquare.piece)) continue;

      jumpMoves.push(new Position(nextR, nextC));
    }

    return jumpMoves;
  }
  abstract canCapture(piece: Piece): boolean;
}

// Jump coordinates
const VERTICAL_JUMP_TOP =
  [[2, 1], [2, 2], [2, 4], [2, 5]]
const VERTICAL_JUMP_BOTTOM =
  [[6, 1], [6, 2], [6, 4], [6, 5]]
const HORIZONTAL_JUMP_LEFT =
  [[3, 0], [4, 0], [5, 0]]
const HORIZONTAL_JUMP_MIDDLE =
  [[3, 3], [4, 3], [5, 3]]
const HORIZONTAL_JUMP_RIGHT =
  [[3, 6], [4, 6], [5, 6]]