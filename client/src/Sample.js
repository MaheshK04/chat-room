import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io.connect("http://localhost:5000");
const userName = "4";
function Sample() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message });
    setMessage("");
  };
  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });
  return (
    <div className="App">
      <h1>Chat app</h1>
      {chat.map((payload, index) => {
        return (
          <p key={index}>
            {payload.message} <span> id:{payload.userName}</span>
          </p>
        );
      })}
      <form onSubmit={sendChat}>
        <input
          type="text"
          name="chat"
          placeholder="send text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        ></input>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Sample;
