import React, { useEffect, useRef } from "react";
import Message from "./Message";

const Messages = ({ messages, name }) => {
  console.log("messages from messages", messages);
  console.log("name from name", name);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      {messages.map(
        (message) => <Message message={message} name={name} />
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
