const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  if (!io) {
    io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      socket.on("timerReached", (data) => {
        console.log("Timer reached for user:", data.userId);
        // Emit the event to the specific user
        io.to(socket.id).emit("timerReached", data);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
      });
    });
  }
  return io;
};

module.exports = { initSocket };
