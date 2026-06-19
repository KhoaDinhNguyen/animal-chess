import { getGame, updateGameDatabase } from "../serverStore.js";
import { Position } from "@shared/game/core/Position";
import { updateGame } from "./update/game.js";

export const movePieceHandler = (data: any) => {
  const { gameId, from, to } = data;

  console.log("handling move piece", gameId, from, to);

  const game = getGame(gameId);

  if (game != null) {
    const nextGameState = game.move(new Position(from.row, from.col), new Position(to.row, to.col));

    updateGameDatabase(gameId, nextGameState);
    updateGame({ gameId });
  }
}