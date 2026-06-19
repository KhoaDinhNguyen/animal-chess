import { Server } from "socket.io";
import { Game } from "@shared/game/core/Game"

let io: Server;
let games = new Map<number, Game>();

export const setSocketServerInstance = (ioInstance: Server) => {
  io = ioInstance;
}

export const getSocketServerInstsance = () => {
  return io;
}

export const addNewGame = (gameId: number, gameInstance: Game) => {
  games.set(gameId, gameInstance);
}

export const getGame = (gameId: number) => {
  return games.get(gameId);
}

export const updateGameDatabase = (gameId: number, gameInstance: Game) => {
  if (!getGame(gameId)) return;

  games.set(gameId, gameInstance);
}