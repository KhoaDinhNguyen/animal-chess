import { Game } from "../core/Game";
import { Piece } from "../pieces/Piece";

/**
 * Evaluate the score of the game (assuming that bot is minimize player)
 * @param game current game state
 */
export function evaluate(game: Game): number {
  let score = 0;

  const squares = game.board.squares;

  // Check dens
  if (squares[0][3].piece !== null) return 100;
  else if (squares[8][3].piece !== null) return -100;

  // Sum of all pieces
  squares.forEach(row => {
    row.forEach(square => {
      if (square.piece !== null) {
        score = score + square.piece.rank * (square.piece.player === 1 ? -1 : 1);
      }
    })
  });

  return score;
}