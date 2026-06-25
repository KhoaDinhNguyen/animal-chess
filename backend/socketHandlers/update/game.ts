import { getSocketServerInstsance } from "../../serverStore"
import { getGame } from "../../serverStore";


export const updateGame = async ({ gameId }: { gameId: number }) => {
  const io = getSocketServerInstsance();

  console.log("Updating game", gameId);

  const game = getGame(gameId);

  game?.board.squares.forEach(row => {
    console.log(row);
  })

  io.emit("game-state", game);
}