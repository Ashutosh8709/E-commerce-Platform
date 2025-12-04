import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_WS_URL, {
  transports: ["websocket"],
  reconnection: true,
});

export default socket;
