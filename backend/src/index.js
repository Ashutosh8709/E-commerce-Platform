import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./db/index.js";
import { app } from "./app.js";
import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

global.io = io;

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

connectDB()
  .then(() => {
    console.log("MONGODB connected successfuly!!");
    server.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
    app.on("error", (error) => {
      console.log("ERRR", error);
      throw error;
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed !!", err);
  });
