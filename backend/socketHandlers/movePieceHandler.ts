import { getGame, updateGameDatabase } from "../serverStore";
import { Position } from "@shared/game/core/Position";
import { updateGame } from "./update/game";
import { findBestMoveForAI } from "../../shared/game/ai/Minimax";

export const movePieceHandler = (data: any) => {
  const { gameId, from, to } = data;

  console.log("handling move piece", gameId, from, to);

  let game = getGame(gameId);

  if (game !== undefined) {
    let nextGameState = game.move(new Position(from.row, from.col), new Position(to.row, to.col));

    // nextGameState.board.squares.forEach(row => {
    //   console.log(row);
    // });

    updateGameDatabase(gameId, nextGameState);
    updateGame({ gameId });
    game = getGame(gameId);

    if (game !== undefined && game.mode === "single" && game.player === 1) {

      if (game !== undefined) {
        const move = findBestMoveForAI(game, 5);

        if (move !== null) {
          nextGameState = game.move(move.from, move.to);

          console.log(move);
          updateGameDatabase(gameId, nextGameState);
          updateGame({ gameId });
        }
      }

    }

  }
}