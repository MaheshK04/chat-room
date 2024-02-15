import React from "react";
import { useState, useEffect } from "react";

const ChatBar = ({ socket }) => {
   const [users, setUsers] = useState([]);
  useEffect(() => {
    socket.on("totalUsers", (data) => setUsers(data));
  }, [socket, users]);
  
  return (
    <div className="chat__sidebar">
      <h1>CHAT BUZZ</h1>
      <div>
        <h4 className="chat__header">ACTIVE USERS ⚡</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>• {user.userName} 🧍🏻</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
