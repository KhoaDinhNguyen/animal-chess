import { Board } from "./Board";
import { Position } from "./Position";

export type PlayerNum = 0 | 1;

// Game class controls 
export class Game {
  public board: Board;
  public selectedSquare: Position | null;
  public moveableSquares: Position[];
  public player: PlayerNum;

  constructor(player?: PlayerNum) {
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
    const isRightPlayer = piece != null && this.player == selectedSquare.piece?.player;
    // TESTING: player can move pieces any turns
    // const isRightPlayer = true;

    newGame.moveableSquares = isRightPlayer && piece != null ? piece.showMoves(newGame, selectedSquare.position) : [];

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