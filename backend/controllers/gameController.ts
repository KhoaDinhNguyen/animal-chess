import { type Request, type Response, type NextFunction } from "express";
import { getGame } from "../serverStore";

async function fetchGameByGameId(req: Request, res: Response, next: NextFunction) {
  const { gameId } = req.params;

  try {
    const game = getGame(Number(gameId));

    if (game == undefined) {
      throw Error("TODO");
    }

    return res.status(200).json({ game: game });
  } catch (err) {
    console.log(err);
  }

  return res.status(400).json({ error: "Game is not found" })
}

const gameControllers = {
  fetchGameByGameId
};

export default gameControllers;