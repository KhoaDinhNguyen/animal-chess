import { GameConfig } from "@shared/game/core/GameConfig";
import { Move } from "@shared/game/core/Move";
import { Game } from "@shared/game/core/Game";
import { useGameStore } from "@/hooks/useGame";
import { updateGame } from "./database";
import { useGameChannel } from "@/hooks/useGameChannel";

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
}