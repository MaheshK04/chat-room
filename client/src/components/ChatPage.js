import React from "react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./chatFooter";
import "../index.css";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const lastMessage = useRef(null);
  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    lastMessage.current?.scrollIntoView({behaviour:'smooth'})
  }, [messages]);
  return (
    <div className="chat">
      <ChatBar socket={socket}  />
      <div className="chat__main">
        <ChatBody messages={messages} lastMessage={lastMessage} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
