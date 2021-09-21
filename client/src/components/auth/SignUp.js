import React from "react";
import Button from "@material-ui/core/Button";
import GoogleLogin from "react-google-login";
import Icon from "./Icon";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {ReactComponent as Illustration} from './illustration.svg';
import Footer from "../ChatComponents/Footer";


const SignUp = ({ name, setName, room, setRoom }) => {
  let history = useHistory();

  const googleSuccess = async (res) => {
    localStorage.clear();
    console.log("res", res);
    const result = res?.profileObj;
    console.log("result", result);
    const token = res?.tokenId;
    const googleName = result.name;

    axios({
      method: "POST",
      url: "http://localhost:5000/api/googleLogin",
      data: { tokenId: token },
      // withCredentials: true
    })
      .then((res) => {
        // let t = localStorage.getItem("token");
        // console.log("t", t);
        // let token = {};
        // token.payload = JSON.parse(window.atob(t.split(".")[1]));
        // console.log("res", res)
        // console.log("token.payload", token.payload)
        // const nameoFHuman = token.payload.name
        // setName(nameoFHuman)
        if (res.data.userStatus == "USER EXISTS") {
          localStorage.clear();
          localStorage.setItem("token", token);
          console.log("ready to go", res.data.userStatus);
          setName(googleName);
          var my_room = prompt("Enter room:");
          console.log("my_room", my_room);
          setRoom(my_room);
          console.log("rooooooooooom", room);

          history.push(`/chat?name=${googleName}&room?name=${my_room}`);
        }
      })
      .catch((err) => {
        console.log("errorr", err);
      });
  };

  const googleFailure = (err) => {
    console.log("err", err);
  };

  return (
    <div style={{backgroundColor: "#2a0944"}}>
    <div className="doc" style={{backgroundColor: "#2a0944"}}>

      <div className="home-box-1" style={{width: "50vw"}} >
        <h1 style={{marginBottom: 100}}>
        ChatSpot</h1>

         <GoogleLogin
        clientId="975350877806-1rgf80otrr4u5ni78s4r1cc0cvdf15vc.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button
            variant="contained"
            color="secondary"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            startIcon={<Icon />}
          >
            Sign In with Google
          </Button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy="single_host_origin"
      />
      </div>
      <div className="home-box-2" style={{width: "50vw"}} >
        {/* <img src="./undraw_Group_chat_re_frmo.png" alt="ok" /> */}
        <Illustration style={{height: "40em", width: "40em"}} />
      </div>






      {/* <GoogleLogin
        clientId="975350877806-1rgf80otrr4u5ni78s4r1cc0cvdf15vc.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button
            variant="contained"
            color="secondary"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            startIcon={<Icon />}
          >
            Sign In with Google
          </Button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy="single_host_origin"
      /> */}


      {console.log("name", name, "room", room)}
    </div>
      <Footer/>
</div>
  );
};

export default SignUp;
