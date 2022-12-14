import React, { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";

const Chat = () => {
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);
  const latestChat = useRef([]);

  latestChat.current = chat;

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:44349/hubs/chat")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then((result) => {
        console.log("Connected!");

        connection.on("ReceiveMessage", (message) => {
          const updatedChat = [...latestChat.current];
          updatedChat.push(message);

          setChat(updatedChat);
        });
      })
      .catch((e) => console.log("Connection failed: ", e));
  }, []);

  const sendMessage = async (user, message) => {
    const chatMessage = {
      user: user,
      message: message,
    };

    try {
      await fetch("https://localhost:44349/api/v1/chat/messages", {
        method: "POST",
        body: JSON.stringify(chatMessage),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log("Sending message failed.", e);
    }
  };

  return (
    <div>
      <ChatInput sendMessage={sendMessage} />
      <hr />
      <ChatWindow chat={chat} />
    </div>
  );
};

export { Chat };
