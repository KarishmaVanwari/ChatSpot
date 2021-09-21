import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import InputMessage from "../ChatComponents/InputMessage";
import Join from "../ChatComponents/Join";
import Messages from "../ChatComponents/Messages";
import UserBox from "../ChatComponents/UserBox";
import useLocalStorage from "../hooks/useLocalStorage";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Footer from "../ChatComponents/Footer";

let socket;

const Chat = ({ name, setName, location, room, setRoom }) => {
  const [message, setMessage] = useLocalStorage("message", "");

  const initialState = () =>
    JSON.parse(window.localStorage.getItem("messages")) || [];
  const [messages, setMessages] = useState(initialState);
  const [users, setUsers] = useState([]);
  const [adminmsg, setAdminmsg] = useState("");
  const [currentRoom, setCurrentRoom] = useState(room);

  console.log("props", name, room);
  console.log("location", location);
  const ENDPOINT = "http://localhost:8000";

  useEffect(() => {
    socket = io(ENDPOINT);
    console.log("socket", socket);

    socket.on("connect", () => {
      console.log("from client- socketid", socket.id);
    });

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    socket.on("disconnectmsg", () => {
      console.log("okokokok");
      localStorage.clear();
    });
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("admintext", (admintext) => {
      console.log("admin text", admintext.text);
      setAdminmsg(admintext.text);
    });
  }, [adminmsg]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("clienttttttttttt", message.users);
      if (message.text) {
        setMessages((messages) => [...messages, message]);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("roomData", ({ users }) => {
      console.log("uuserssss", users);
      setCurrentRoom(users[0].room);
      var newArr = [];
      for (var i in users) {
        newArr.push(users[i].name);
      }
      console.log("nooooooooooooooo", newArr);

      setUsers(newArr);
    });
  }, [users]);

  useEffect(() => {
    console.log("cooooooool");
    window.localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    setMessage(event.target.value);

    if (message) {
      socket.emit("sendMessage", { message, room, users: users }, () =>
        setMessage("")
      );
    }
  };

  const showUserBox = () => {
    console.log("ok");
    if(window.innerWidth<1110){
      console.log("10101001")
    document.querySelector("#user-box").style.display = 'flex';
    document.querySelector("#actual-chat-box").style.display = "none";

    }
    document.querySelector("#user-box").style.display = "flex";
    document.querySelector("#menu-icon").style.display = "none";
    
  };

  return (
    <React.Fragment>
      <div className="chat-page">
        <h1
          style={{
            paddingTop: 20,
            margin: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          ChatSpot
        </h1>
        <div style={{ display: "flex" }} className="big-box">
          <UserBox users={users} currentRoom={currentRoom} />
          {/* <div style={{ width: 300}} className="chat-box">
          {users}
        </div> */}
          <div className="chat-box" id="actual-chat-box">
            <div
              className="chat-header"
              style={{
                height: "10%",
                display: "flex",
                alignItems: "center",
                paddingLeft: 10,
                justifyContent: "space-between",
              }}
            >
              <div>
                <MenuRoundedIcon
                  style={{ cursor: "pointer", display: "none" }}
                  id="menu-icon"
                  onClick={showUserBox}
                />
              </div>
              <div>
                <h2 style={{ margin: "10px", padding: 0 }}>{room}</h2>
              </div>
              <div>{/* ok */}</div>
            </div>
            <div className="chat-area">
              {/* join */}
              {/* <Join adminmsg={adminmsg} /> */}
              {/* <div className="chat-join">
              <p>Om joined the chat!</p>
            </div> */}

              {/* messages */}
              <Messages messages={messages} name={name} />
              {/* <div className="chat-left">
              <span>Karishma</span> <br />
              <p style={{ margin: 0 }}>Hi hello whats up</p>
              <br />
            </div> */}
              {/* <div className="chat-right">
              <span>Om</span> <br />
              <p style={{ margin: 0 }}>All good, tu bata</p> <br />
            </div> */}
            </div>

            <InputMessage
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
            {/* <div className="send">
            <form>
            <Input
            placeholder="Type a message"
                color="secondary"
                style={{ width: "90%", color: "white", margin: "0 10px" }}
                inputProps={{ "aria-label": "description" }}
                />
                <Fab color="secondary" aria-label="send" size="small">
                <Send style={{ fontSize: 18 }} />
                </Fab>
                </form>
              </div> */}
          </div>
        </div>
              <Footer/>
      </div>
      <div>
        <Link to="/">
          {/* useGoogleLogout from react-google-login */}
          {/* <Button variant="contained" color="secondary" onClick={localStorage.removeItem('token')}>
            Logout
          </Button> */}
        </Link>
      </div>
      
    </React.Fragment>
  );
};

export default Chat;
