"use server";


const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

/**
 * Fetches a game by its ID.
 *
 * @param gameId - The game ID.
 * @returns The game object, or null if the request fails.
 */
export const fetchGameByGameId = async (gameId: string) => {
  const url = `${SERVER_URL}/game/${gameId}`;

  try {
    const jsonResponse = await fetch(url, {
      method: "GET",
    });

    if (!jsonResponse.ok) throw Error("TODO");

    const game = await jsonResponse.json();

    return game;

  } catch (err) {
    console.log(err);
  }

  return null;
}

/**
 * Create game
 * 
 * @returns The game object, or null
 */
export const createGame = async (gameMode: string) => {
  const url = `${SERVER_URL}/game`;
  try {
    const jsonResponse = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        mode: gameMode
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!jsonResponse.ok) throw Error("TODO");

    const game = jsonResponse.json();

    return game;

  } catch (err) {
    console.log(err);
  }

  return null;
}