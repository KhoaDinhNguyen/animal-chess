import { Board } from "./Board";
import { Position } from "./Position";
import { Move } from "./Move";

export type PlayerNum = 0 | 1;
export type GameMode = "single" | "multi"

// Game class controls 
export class Game {
  public board: Board;
  public selectedSquare: Position | null;
  public moveableSquares: Move[];
  public player: PlayerNum;
  public gameId: number;
  public mode: GameMode;

  constructor(gameId: number, mode: GameMode, gameData?: Game) {
    this.board = new Board();
    this.selectedSquare = null;
    this.moveableSquares = [];
    this.player = 0;
    this.gameId = gameId;
    this.mode = mode;
  }

  /**
   * Selects a square
   * @param position Current select position
   * @returns Game object
   */
  selectSquare(position: Position) {
    const game = Game.clone(this);
    const selectedSquare = game.board.squares[position.row][position.col];

    // Select a square
    game.selectedSquare = selectedSquare.position;

    // If the square is animal piece then show available moves
    const piece = selectedSquare.piece;
    game.moveableSquares = piece && piece.player === game.player ? piece.showMoves(game, selectedSquare.position) : [];

    return game;
  }

  /**
   * Unselects a square
   * @returns Game object
   */
  unselectSquare() {
    const game = Game.clone(this);

    game.moveableSquares = [];
    game.selectedSquare = null;

    return game;
  }

  /**
   * Moves a piece
   * @returns Game object
   */
  move(from: Position, to: Position) {
    const game = Game.clone(this);

    game.board.move(from, to);
    game.player = this.nextPlayer();
    game.selectedSquare = null;
    game.moveableSquares = [];

    return game;
  }

  nextPlayer() {
    return this.player == 1 ? 0 : 1
  }

  /**
   * Check whether the game is over
   * @returns boolean
   */
  isOver(): boolean {
    return this.board.squares[0][3].piece !== null || this.board.squares[8][3].piece !== null;
  }


  /**
   * Return deep copy of Game object
   * @param gameData current game data
   * @returns Game object
   */
  static clone(gameData: Game) {
    const game = new Game(gameData.gameId, gameData.mode);

    game.board = Board.clone(gameData.board);
    game.moveableSquares = [...gameData.moveableSquares];
    game.player = gameData.player;
    game.selectedSquare = gameData.selectedSquare;

    return game;
  }
}