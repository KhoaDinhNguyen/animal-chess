import express from "express";
import http from "http";
import SocketServer from "./socketServer";
import cors from "cors";
import gameRouters from "./routes/gameRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/game", gameRouters);

const server = http.createServer(app);
SocketServer.registerSocketServer(server);

server.listen(8000, () => {
  console.log("Server listen at 8000");
})


