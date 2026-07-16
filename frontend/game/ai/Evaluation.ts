import { Game } from "../core/Game";
import { PlayerRole } from "@game/types"
import { Position } from "../core/Position";

const WIN_SCORE = 1000000;
const PIECE_SCORE_MULTIPLIER = 100;
const TRAP_CONTROL_SCORE = 30;
const MAX_DEN_DISTANCE = 11;

/**
 * Evaluate the score of the game (assuming that bot is minimize player)
 * @param game current game state
 */
export function evaluate(game: Game): number {

  const squares = game.board.squares;

  // Check dens
  if (squares[0][3].piece !== null) return WIN_SCORE;
  else if (squares[8][3].piece !== null) return -WIN_SCORE;

  let score = 0;
  // Sum of all pieces
  score += evaluatePiece(game);
  score += evaluatePosition(game);
  score += evaluateTrapControl(game);
  // score += evaluateSafety(game);
  // score += evaluateAttack(game);
  // score += evaluateMobility(game);
  // score += evaluateDenPressure(game);


  return score;
}

/** Evalute game's score based on pieces */
function evaluatePiece(game: Game): number {
  let score = 0;
  const squares = game.board.squares;

  // Sum of all pieces
  for (const row of squares) {
    for (const square of row) {
      const piece = square.piece;

      if (!piece) continue;

      const sign = getSign(piece.player);
      score = score + piece.rank * sign * PIECE_SCORE_MULTIPLIER;

    }
  }

  return score;
}

/** Evalute game's score based on position */
function evaluatePosition(game: Game): number {
  let score = 0;

  const squares = game.board.squares;

  // Sum of all position
  for (const row of squares) {
    for (const square of row) {
      const piece = square.piece;

      if (!piece) continue;
      const sign = getSign(piece.player);

      const progress = MAX_DEN_DISTANCE - square.getDistanceToEnemyDen(piece.player === "player1" ? new Position(8, 3) : new Position(0, 3));
      score += progress * sign * piece.rank;
    }
  }


  return score;
}

function evaluateTrapControl(game: Game): number {
  let score = 0;

  const squares = game.board.squares;

  for (const row of squares) {
    for (const square of row) {
      const piece = square.piece;

      if (!piece) continue;

      const sign = getSign(piece.player);

      if (square.isEnemyTrap(piece.player)) {
        score += TRAP_CONTROL_SCORE * sign;
      }
    }
  }
  return score;
}

function getSign(player: PlayerRole) {
  return player === "player1" ? 1 : -1;
}