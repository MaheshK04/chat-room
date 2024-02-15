import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit("newUser", { userName, socketID: socket.id });
    navigate("/chat");
  };
  return (
    <div className="login-page">
      <div className="form-container">
        <h1 className="home__header">Chat Buzz</h1>
        <input
          type="text"
          minLength={3}
          maxLength={12}
          name="username"
          id="username"
          placeholder="Enter your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>
          Join Chat💬
        </button>
      </div>
    </div>
  );
};

export default SignIn;
