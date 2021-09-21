import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const UserBox = ({ users, currentRoom }) => {
  const closeMenu = () => {
    if(window.innerWidth<1110){
    document.querySelector("#actual-chat-box").style.display = "flex";

    }
    document.querySelector("#user-box").style.display = "none";
    document.querySelector("#menu-icon").style.display = "flex";
  };

  window.onload = function load() {
    document.querySelector("#menu-icon").style.display = "none";
  };

  return (
    <>
      <div style={{ width: 300 }} className="chat-box" id="user-box">
        <div
          className="chat-header"
          style={{
            height: "10%",
            display: "flex",
            alignItems: "center",
            paddingLeft: 10,
          }}
        >
          <div>
            <CloseRoundedIcon
              onClick={closeMenu}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div>
            <h2 style={{ margin: "10px", padding: 27 }}>ChatRoom(s)</h2>
          </div>
        </div>

        <Accordion style={{ backgroundColor: "#2a0944" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ paddingLeft: "10px" }}>
              {currentRoom}
            </Typography>
          </AccordionSummary>
          {users.map((user) => (
            <AccordionDetails>
              <Typography style={{ paddingLeft: "20px" }}>{user}</Typography>
            </AccordionDetails>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default UserBox;
