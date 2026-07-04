import { supabase } from "./supabase";
import { GameConfig, GameMode } from "@shared/game/core/GameConfig";
import { Game } from "@shared/game/core/Game";

/**
 * Fetchs game config given gameId
 * @param gameId string object
 * @returns gameConfig or null
 */
export async function fetchGameByGameId(gameId: string) {
  const { data, error } = await supabase.from("games").select().eq("id", gameId).single();

  if (error) {
    console.log(error);
    return null;
  }

  if (!data) return null;

  return Game.fromJSON(data);
}

/**
 * Creates game to database
 * @param gameMode string object
 */
export async function createGame(gameMode: GameMode) {
  const game = new Game({ mode: gameMode });

  const { data, error } = await supabase.from("games").insert(game.toJSON()).select().single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
/**
 * Update game config to the database
 * @param gameId game's ID
 * @param game GameConfig object
 * @returns gameConfig or null
 */
export async function updateGame(gameId: string, game: GameConfig) {
  const { data, error } = await supabase.from("games").update(Game.clone(game).toJSON()).eq("id", gameId).select().single();

  if (error) {
    console.error(error.message);
    return null;
  }

  return Game.fromJSON(data);
}
