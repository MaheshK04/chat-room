//imports
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = 4000;
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello world Version 2</h1>");
});

let users = [];

io.on("connection", (socket) => {
  console.log(`${socket.id} user connected`);

  //handles message
  socket.on("message", (data) => {
    //console.log(data);
    io.emit("messageResponse", data);
  });

  //User Joins the chat
  socket.on("newUser", (data) => {
    users.push(data);
    io.emit("totalUsers", users);
  });

  //Validates UserName
  socket.on("checkUserName", (userName) => {
    const isAvailable = !users.some((user) => user.userName === userName);
    socket.emit("userNameAvailability", isAvailable);
  });

  //Disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");

    users = users.filter((user) => user.socketID !== socket.id);
    io.emit("totalUsers", users);
    socket.disconnect();
  });

  // socket.on('chat', (payload) => {
  //     io.emit("chat" ,payload)
  // })
});

http.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
