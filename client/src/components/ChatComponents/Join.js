import React from "react";

const Join = ({ adminmsg }) => {
  console.log(adminmsg);
  return (
    <div className="chat-join">
      <p>{adminmsg}</p>
    </div>
  );
};

export default Join;
