import { getSocketServerInstsance } from "../../serverStore.js"
import { getGame } from "../../serverStore.js";


export const updateGame = async ({ gameId }: { gameId: number }) => {
  const io = getSocketServerInstsance();

  console.log("Updating game", gameId);

  const game = getGame(gameId);

  io.emit("game-state", game);
}