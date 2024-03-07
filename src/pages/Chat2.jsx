import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8888/");

function Chat2() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.auth = { sender: 2 };

    socket.connect();
    return () => socket.disconnect();
  }, []);

  const change = (e) => {
    setMessage(e.target.value);
  };

  const submit = async (e) => {
    e.preventDefault();

    await socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    socket.on("received", (msg) => {
      // setChat([...chat, { message: msg, sender: 2, received: 1 }]);
      setChat([...chat, { ...msg }]);
    });
  }, [chat]);

  return (
    <div>
      <form onSubmit={submit}>
        <input onChange={change} value={message} type="text" name="" id="" />
        <button>send</button>
      </form>
      <div className="p-4">
        {chat.map((el) => (
          <div className="flex">
            <span className={el.sender == 2 ? "text-red-500" : ""}>
              {el.sender == 2 ? "sender : " : "received : "}
            </span>
            <h1 className={`mr-4 ${el.sender == 2 ? "text-red-500" : ""}`}>
              {el.msg}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat2;