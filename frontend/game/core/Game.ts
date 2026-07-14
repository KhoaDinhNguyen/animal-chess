import { Board } from "./Board";
import { Position } from "./Position";
import { Move } from "./Move";
import { GameConfig } from "./GameConfig";
import { PlayerNum, } from "./GameConfig";

// Game class controls 
export class Game {
  public config: GameConfig;

  constructor(config: Partial<GameConfig> = {}) {
    this.config = {
      board: config.board ?? new Board(),
      selectedSquare: config.selectedSquare ?? null,
      moveableSquares: config.moveableSquares ?? [],
      player: config.player ?? 1,
      mode: config.mode ?? "single",
      winner: config.winner ?? null,
      lastMove: config.lastMove ?? null
    };
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
    game.lastMove = new Move(from, to);
    game.checkGameOver();

    return game;
  }

  nextPlayer() {
    return this.config.player == 1 ? 2 : 1
  }

  /**
   * Check whether the game is over
   */
  checkGameOver(): void {
    if (this.board.squares[0][3].piece !== null) {
      this.winner = 1;
    }
    else if (this.board.squares[0][3].piece !== null) {
      this.winner = 2;
    }
  }


  /**
   * Return deep copy of Game object
   * @param gameData current game data
   * @returns Game object
   */
  static clone(data: Game | GameConfig) {
    const config = data instanceof Game ? data.config : data;

    return new Game({
      board: Board.clone(config.board),
      selectedSquare: config.selectedSquare ? Position.clone(config.selectedSquare) : null,
      moveableSquares: config.moveableSquares.map(Move.clone),
      player: config.player,
      mode: config.mode,
      winner: config.winner,
      lastMove: config.lastMove ? Move.clone(config.lastMove) : null
    });
  }


  // get-set board
  get board() { return this.config.board };
  set board(board: Board) { this.config.board = board };

  // get-set player
  get player() { return this.config.player };
  set player(player: PlayerNum) { this.config.player = player };

  // get-set winner
  get winner() { return this.config.winner };
  set winner(winner: PlayerNum | null) { this.config.winner = winner };

  // get-set selected square
  get selectedSquare() { return this.config.selectedSquare };
  set selectedSquare(pos: Position | null) { this.config.selectedSquare = pos };

  // get-set moveable squares
  get moveableSquares() { return this.config.moveableSquares };
  set moveableSquares(move: Move[]) { this.config.moveableSquares = move };

  // get-set last move
  get lastMove() { return this.config.lastMove };
  set lastMove(lastMove: Move | null) { this.config.lastMove = lastMove; }

  // get mode
  get mode() { return this.config.mode };
  //serialization

  /** Convert game instance to JSON data */
  toJSON() {
    return {
      board: this.board,
      current_turn: this.player,
      winner: this.winner,
      mode: this.mode,
      last_move: this.lastMove
    }
  }


  static fromJSON(data: any): GameConfig {
    return {
      board: data.board,
      player: data.current_turn,
      winner: data.winner,
      mode: data.mode,
      selectedSquare: null,
      moveableSquares: [],
      lastMove: data.last_move
    }
  }

}