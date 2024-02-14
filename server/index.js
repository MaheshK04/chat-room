//imports
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = 4000;
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log(`${socket.id} user connected`);
  socket.on("message", (data) => {
    console.log(data)
    io.emit("messageResponse", data);
  });
  socket.on("disconnect", () => {
    //logs disconnect when user leave page
    console.log("User disconnected");
  });

  // socket.on('chat', (payload) => {
  //     io.emit("chat" ,payload)
  // })
});

http.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
