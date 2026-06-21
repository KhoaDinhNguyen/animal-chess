import { Router } from "express";
import gameControllers from "../controllers/gameController";

const gameRouters = Router();

gameRouters.get("/:gameId", gameControllers.fetchGameByGameId);

export default gameRouters;