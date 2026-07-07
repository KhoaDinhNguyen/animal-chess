import { type Request, type Response, type NextFunction } from "express";
import { getGame, addNewGame } from "../serverStore";

async function fetchGameByGameId(req: Request, res: Response, next: NextFunction) {
  const { gameId } = req.params;

  console.log(gameId);
  try {
    const game = getGame(Number(gameId));

    if (game == undefined) {
      throw Error("TODO");
    }

    return res.status(200).json(game);
  } catch (err) {
    console.log(err);
  }

  return res.status(400).json({ error: "Game is not found" })
}

async function createGame(req: Request, res: Response, next: NextFunction) {
  const { mode } = req.body;

  try {
    const newGameId = addNewGame(mode);
    const game = getGame(newGameId);

    if (game == undefined) {
      throw Error("TODO");
    }

    return res.status(201).json(game);
  }
  catch (err) {
    console.log("TODO");
  }
}
const gameControllers = {
  fetchGameByGameId,
  createGame
};

export default gameControllers;