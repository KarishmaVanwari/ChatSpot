import React from "react";

const Message = ({ message:{user, text}, name }) => {
  console.log("message0000000000", name);
  var currentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if(user==trimmedName){
      currentUser = true;
  }

  return currentUser ? (
    <>
      <div className="chat-left">
        <span>{user}</span> <br />
        <p style={{ margin: 0 }}>{text}</p>
        <br />
      </div>
      <br />
    </>
  ) : (
    <>
      <div className="chat-right">
        <span>{user}</span> <br />
        <p style={{ margin: 0 }}>{text}</p> <br />
      </div>
      <br />
    </>
  );
};

export default Message;
