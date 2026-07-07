import { Server } from "socket.io";
import { Game } from "@shared/game/core/Game"
import { GameMode } from "@shared/game/core/Game";

let io: Server;
let games = new Map<number, Game>();

let gameId = 0;
export const setSocketServerInstance = (ioInstance: Server) => {
  io = ioInstance;
}

export const getSocketServerInstsance = () => {
  return io;
}

export const addNewGame = (mode: GameMode): number => {
  const newGameId = gameId++;

  games.set(newGameId, new Game(newGameId, mode));

  return newGameId;
}

export const getGame = (gameId: number) => {
  return games.get(gameId);
}

export const updateGameDatabase = (gameId: number, gameInstance: Game) => {
  if (!getGame(gameId)) return;

  games.set(gameId, gameInstance);
}