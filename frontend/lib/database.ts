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

  return data;
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

export async function assignRoleToGame(gameId: string, token: string): Promise<"player1" | "player2" | "spectator"> {
  // Check if already join
  const { data: game } = await supabase.from("games").select("player_1_token, player_2_token, mode").eq("id", gameId).single();

  if (!game) {
    throw Error("Game does not exist");
  }

  if (game.player_1_token === token) return "player1";
  if (game.player_2_token === token) return "player2";

  const { data: p1Data } = await supabase.from("games").update({ player_1_token: token }).eq("id", gameId).is("player_1_token", null).select().single();

  /** Player 1 checking */
  if (p1Data) return "player1";

  /** Plyer 2 checking */
  if (game.mode === "multi") {
    const { data: p2Data } = await supabase.from("games").update({ player_2_token: token }).eq("id", gameId).is("player_2_token", null).select().single();

    if (p2Data) return "player2";
  }

  return "spectator";
}