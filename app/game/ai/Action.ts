import { Game } from "../core/Game";
import { Move } from "../core/Move";

/**
 * Returns list of available action based on current game state
 * @param game Game object
 * @returns array of Move object
 */
export function action(game: Game): Move[] {
  const possibleMoves: Move[] = [];

  const squares = game.board.squares;

  squares.forEach(row => {
    row.forEach(square => {
      const piece = square.piece;

      if (piece !== null && piece.player === game.currentTurnPlayer) {
        possibleMoves.push(...piece.getLegalMoves(game, square.position));
      }
    })
  })

  return possibleMoves;
}

/**
 * Returns next game state based on action
 * @param game Game object
 * @param move Move oject
 * @returns Game object
 */
export function result(game: Game, move: Move): Game {
  return game.move(move.from, move.to);
}
