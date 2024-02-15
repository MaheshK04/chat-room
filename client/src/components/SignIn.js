import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const SignIn = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.length < 3 || userName.length > 8) {
      alert(`userName must be between 3 and 8 characters long`);
      return;
    }

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
          maxLength={8}
          name="username"
          id="username"
          placeholder="Enter your Name"
          value={userName}
          ref={inputRef}
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
