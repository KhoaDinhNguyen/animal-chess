import { Board } from "./Board";
import { Position } from "./Position";
import { Move } from "./Move";
import { PlayerRole } from "@game/types";
import { GameConfig } from "./GameConfig";
import { DEN_BY_PLAYER } from "./boardLayout";

/**
 * Represents the complete state of a game.
 *
 * The Game class follows an immutable-style design:
 * operations such as selecting a square or moving a piece
 * return a cloned game state instead of modifying the
 * original instance.
 */
export class Game {
  public config: GameConfig;

  constructor(config: Partial<GameConfig> = {}) {
    this.config = {
      board: config.board ?? new Board(),
      selectedSquare: config.selectedSquare ?? null,
      moveableSquares: config.moveableSquares ?? [],
      currentTurnPlayer: config.currentTurnPlayer ?? "player1",
      mode: config.mode ?? "single",
      winner: config.winner ?? null,
      lastMove: config.lastMove ?? null
    };
  }

  /**
   * Selects a board square and updates the list of legal moves.
   *
   * If the selected square contains the current player's piece,
   * its legal moves are generated. Otherwise, no moves are available.
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
    const canMove = piece && piece.player;

    game.moveableSquares = canMove ? piece.getLegalMoves(game, selectedSquare.position) : [];

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
   * Applies a move and advances the game to the next turn.
   *
   * This updates the board, clears the current selection,
   * records the last move, and checks for a winner.
   * @returns Game object
   */
  move(from: Position, to: Position) {
    const game = Game.clone(this);

    game.board.move(from, to);
    game.lastMove = new Move(from, to);

    game.selectedSquare = null;
    game.moveableSquares = [];

    game.currentTurnPlayer = this.getNextPlayer();

    game.checkGameOver();

    return game;
  }

  // -----------------------------------------------------------------------------
  // Game state
  // -----------------------------------------------------------------------------
  getNextPlayer(): PlayerRole {
    return this.config.currentTurnPlayer == "player1" ? "player2" : "player1"
  }

  /**
   * Determines whether either player has occupied
   * the opponent's den.
   */
  checkGameOver(): void {
    const [player1Row, player1Col] = DEN_BY_PLAYER.player1;
    const [player2Row, player2Col] = DEN_BY_PLAYER.player2;

    if (this.board.squares[player2Row][player2Col].piece !== null) {
      this.winner = "player1";
    }
    else if (this.board.squares[player1Row][player1Col].piece !== null) {
      this.winner = "player2";
    }
  }

  // -----------------------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------------------
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
      currentTurnPlayer: config.currentTurnPlayer,
      mode: config.mode,
      winner: config.winner,
      lastMove: config.lastMove ? Move.clone(config.lastMove) : null
    });
  }

  /** Convert game instance to JSON data */
  toJSON() {
    return {
      board: this.board,
      current_turn: this.currentTurnPlayer,
      winner: this.winner,
      mode: this.mode,
      last_move: this.lastMove
    }
  }


  static fromJSON(data: any): GameConfig {
    return {
      board: data.board,
      currentTurnPlayer: data.current_turn,
      winner: data.winner,
      mode: data.mode,
      selectedSquare: null,
      moveableSquares: [],
      lastMove: data.last_move
    }
  }


  // get-set board
  get board() { return this.config.board };
  set board(board: Board) { this.config.board = board };

  // get-set player
  get currentTurnPlayer() { return this.config.currentTurnPlayer };
  set currentTurnPlayer(currentTurnPlayer: PlayerRole) { this.config.currentTurnPlayer = currentTurnPlayer };

  // get-set winner
  get winner() { return this.config.winner };
  set winner(winner: PlayerRole | null) { this.config.winner = winner };

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
}