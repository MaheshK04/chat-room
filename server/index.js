//imports
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const PORT = 5000;
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log(`${socket.id} user connected`);

  //logs disconnect when user leave page
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  //logs the message to the console
  socket.on("message", (data) => {
    console.log(data);
  });

  // socket.on('chat', (payload) => {
  //     io.emit("chat" ,payload)
  // })
});

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
