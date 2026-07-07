import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { getGame, addNewGame, setSocketServerInstance } from "./serverStore";
import { Game } from "@shared/game/core/Game";
import { updateGame } from "./socketHandlers/update/game";
import { movePieceHandler } from "./socketHandlers/movePieceHandler";


const registerSocketServer = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  setSocketServerInstance(io);

  io.on("connect", (socket) => {
    console.log("user connect ", socket.id);

    if (getGame(0) == null) addNewGame("single");

    // updateGame({ gameId: 0 });

    socket.on("move-piece", (data) => {
      // console.log("move piece", data);
      movePieceHandler(data);
    })

  });


}

const SocketServer = {
  registerSocketServer
}

export default SocketServer;