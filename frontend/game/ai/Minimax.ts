import { evaluate } from "./Evaluation";
import { action, result } from "./Action";
import { Game } from "../core/Game";
import { Move } from "../core/Move";

export function minimax(depth: number, game: Game, alpha: number, beta: number): number {
  if (depth <= 0 || game.winner !== null) {
    return evaluate(game);
  }

  // Check possible moves
  const moves = action(game);

  if (moves.length === 0) {
    return evaluate(game);
  }

  if (game.currentTurnPlayer === "player1") {
    let maxVal = Number.NEGATIVE_INFINITY;
    for (const move of moves) {
      maxVal = Math.max(maxVal, minimax(depth - 1, result(game, move), alpha, beta));
      alpha = Math.max(alpha, maxVal);

      if (beta <= alpha) break;
    }

    return maxVal;
  }
  else {
    let minVal = Number.POSITIVE_INFINITY;
    for (const move of moves) {
      minVal = Math.min(minVal, minimax(depth - 1, result(game, move), alpha, beta));
      beta = Math.min(beta, minVal);

      if (beta <= alpha) break;
    }

    return minVal;
  }
}

/**
 * Gets the best move for AI
 * @param game current game state
 * @param depth 
 * @returns Move object
 */
export function findBestMoveForAI(game: Game, depth: number): Move | null {
  let bestMove: Move | null = null;
  let bestScore = Number.POSITIVE_INFINITY;

  for (const move of action(game)) {

    const score = minimax(depth - 1, result(game, move), Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);

    if (score < bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}
