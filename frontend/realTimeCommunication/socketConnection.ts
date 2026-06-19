import { io, Socket } from "socket.io-client";
import { useGameStore } from "@/hooks/useGame";
import { Position } from "@shared/game/core/Position";

let socket: Socket;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

console.log(SERVER_URL);
export const connectWithSocketServer = () => {
  socket = io(SERVER_URL);

  socket.on("connect", () => {
    console.log("successfully connected with socket.io server");
    console.log(socket.id);
  });

  socket.on("game-state", (data) => {
    console.log("lisenting game state", data);
    useGameStore.getState().setGame(data);
  })
}

export const emitMovePiece = (gameId: number, from: Position, to: Position) => {
  socket.emit("move-piece", { gameId, from, to });
}