import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import Chat from "./components/ChatScreen/Chat";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import useLocalStorage from "./components/hooks/useLocalStorage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useLocalStorage("name", "");
  const [room, setRoom] = useLocalStorage("room", "");

  useEffect(() => {
    setName(JSON.parse(window.localStorage.getItem("name")));
    console.log("heyyyyyyyyyyyyyyyyyy", name);
  }, []);

  useEffect(() => {
    var rooom = JSON.parse(window.localStorage.getItem("room"));
    setRoom(rooom);
    console.log("rooooooooooooooooooooom", localStorage.getItem("room"));
  }, []);

  useEffect(() => {
    console.log("cooooooool");
    window.localStorage.setItem("name", JSON.stringify(name));
  }, [name]);

  useEffect(() => {
    console.log("cooooooool");
    window.localStorage.setItem("room", JSON.stringify(room));
  }, [room]);

  const theme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        // main: "#3f50b5",
        main: "#1A2744",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        main: "#00bfff",
        // main: "#ff1493",
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <SignUp
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              name={name}
              setName={setName}
              room={room}
              setRoom={setRoom}
            />
          </Route>
          <Route path="/chat">
            {localStorage.getItem("token") ? (
              <Chat
                name={name}
                setName={setName}
                room={room}
                setRoom={setRoom}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
