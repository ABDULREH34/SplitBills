import { Server } from "socket.io";

let io;

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("🚀 Setting up WebSocket server...");
    io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Driver connected:", socket.id);

      socket.on("rideAccepted", (rideData) => {
        console.log("✅ Ride Accepted:", rideData);
        io.emit("rideAccepted", rideData); 
      });

      socket.on("disconnect", () => {
        console.log("Driver disconnected:", socket.id);
      });
    });
  }
  res.end();
}

export function notifyDrivers(newRide) {
  if (io) {
    io.emit("newRideRequest", newRide);
  }
}
