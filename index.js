const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(`user ${socket.client.id} connected`);

  socket.on("new-message", (message) => {
    console.log(`message from ${socket.client.id}`);
    console.log(message);
  });

  socket.on("disconnect", () => {
    console.log(`user ${socket.client.id} disconnected`);
  });
});

server.listen(3000, () => {
  console.log("listening on port :3000");
});
