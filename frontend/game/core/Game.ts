import { Board } from "./Board";
import { Position } from "./Position";

export class Game {
  public board: Board;
  public selectedSquare: Position | null;
  public moveableSquares: Position[];
  public player: number;

  constructor(player?: number) {
    this.board = new Board();
    this.selectedSquare = null;
    this.moveableSquares = [];
    this.player = player == undefined ? 0 : player;
  }

  selectSquare(position: Position) {
    const newGame = new Game(this.player);
    newGame.board = Board.clone(this.board);

    const selectedSquare = newGame.board.squares[position.row][position.col];

    newGame.selectedSquare = position;

    const piece = selectedSquare.piece;
    const isRightPlayer = piece != null && ((this.player == 0 && piece.color == "blue") || (this.player == 1 && piece.color == "red"))

    newGame.moveableSquares = isRightPlayer && piece != null ? piece.showMoves(newGame.board, selectedSquare.position) : [];

    return newGame;
  }

  move(from: Position, to: Position) {
    const newGame = new Game(this.nextPlayer());
    newGame.board = Board.clone(this.board);

    newGame.board.move(from, to);
    newGame.selectedSquare = null;
    newGame.moveableSquares = [];

    return newGame;
  }

  nextPlayer() {
    return this.player == 1 ? 0 : 1
  }
}