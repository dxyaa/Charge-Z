const express = require("express");
const next = require("next");
const http = require("http");
const { initSocket } = require("./socket");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);


 socket.on("location", (data) => {
    console.log("Received location data:", data);

    
  io.emit("locationUpdate", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");

  });

  httpServer.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
