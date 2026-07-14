import { GameConfig } from "@game/core/GameConfig";
import { Move } from "@game/core/Move";
import { Game } from "@game/core/Game";
import { useGameStore } from "@/hooks/useGame";
import { updateGame } from "./database";
import { useGameChannel } from "@/hooks/useGameChannel";
import { findBestMoveForAI } from "@game/ai/Minimax";

/** Apply player's move */
export async function makeMove(gameId: string, gameConfig: GameConfig, move: Move) {
  const game = Game.clone(gameConfig).move(move.from, move.to);

  const gameState = useGameStore.getState();

  // Check whether the game is active
  if (gameState.gameId !== gameId) return;

  gameState.setGameConfig(game.config);

  const data = await updateGame(gameId, game.config);

  // Roll back the previous status
  if (!data) {
    // TODO: add notification
    gameState.setGameConfig(game.config);
    return;
  }

  // If the database is updated, emit socket
  const channelState = useGameChannel.getState();

  channelState.send("move", game.config);

  if (gameConfig.mode === "single") {
    await makeAIMove(gameId, game.config);
  }
}

/** Apply AI's move */
export async function makeAIMove(gameId: string, gameConfig: GameConfig) {
  const bestMove = findBestMoveForAI(Game.clone(gameConfig), 5);

  // TODO: When no best moves
  if (!bestMove) return;

  const game = Game.clone(gameConfig).move(bestMove.from, bestMove.to);

  const data = await updateGame(gameId, game.config);

  //TODO: When update fails
  if (!data) return;

  const gameState = useGameStore.getState();

  gameState.setGameConfig(game.config);

  // If the database is updated, emit socket
  const channelState = useGameChannel.getState();

  channelState.send("move", game.config);
}