import express from "express";
import http from "http";
import SocketServer from "./socketServer";
import cors from "cors";

const app = express();

app.use(cors());

const server = http.createServer(app);
SocketServer.registerSocketServer(server);

server.listen(8000, () => {
  console.log("Server listen at 8000");
})


